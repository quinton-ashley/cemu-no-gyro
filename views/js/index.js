module.exports = async function(arg) {
	await require(arg.__rootDir + '/core/setup.js')(arg);
	log('version: ' + pkg.version);

	const gyroServer = require('./gyroServer.js');
	const {
		Mouse,
		Keyboard,
		Gamepad,
		or,
		and
	} = require('contro');
	let gamepad = new Gamepad();

	const http = require("http");
	const WebSocket = require("ws");

	let btnNames = [
		'lt', 'rt'
	];
	let btns = {};
	for (let i of btnNames) {
		btns[i] = gamepad.button(i);
	}
	let btnStates = {};
	let speedShift = true;
	let axises = ['x', 'y', 'z'];
	let invert = {
		x: 1,
		y: 1,
		z: 1
	};
	let gamepadConnected = false;
	let inNuetralPos = {
		x: true,
		y: true,
		z: true
	};
	let stickDeadZone = 0.2;

	let files = await klaw(path.join(__rootDir, '/views/md'));
	for (let file of files) {
		let html = await fs.readFile(file, 'utf8');
		html = '<div class="md">' + md(html) + '</div>';
		file = path.parse(file);
		$('#' + file.name).prepend(html);
	}
	$(document).on('click', 'a[href^="http"]', function(event) {
		event.preventDefault();
		opn(this.href);
	});

	function toggleAxis() {
		let $btn = $(this);
		$btn.toggleClass('enabled');
		axises = [];
		if ($('#gyroX').hasClass('enabled')) {
			axises.push('x');
		}
		if ($('#gyroY').hasClass('enabled')) {
			axises.push('y');
		}
		if ($('#gyroZ').hasClass('enabled')) {
			axises.push('z');
		}
	}
	$('#gyroX').click(toggleAxis);
	$('#gyroY').click(toggleAxis);
	$('#gyroZ').click(toggleAxis);

	function toggleControls() {
		let $btn = $(this);
		let axis = $btn.attr('id')[6].toLowerCase();
		$btn.toggleClass('enabled');
		if ($btn.hasClass('enabled')) {
			invert[axis] = 1;
			$btn.text(axis.toUpperCase() + ' normal');
		} else {
			invert[axis] = -1;
			$btn.text(axis.toUpperCase() + ' inverted');
		}
		log(invert);
	}
	$('#invertX').click(toggleControls);
	$('#invertY').click(toggleControls);
	$('#invertZ').click(toggleControls);

	function toggleSpeedShifters() {
		let $btn = $(this);
		$btn.toggleClass('enabled');
		speedShift = $btn.hasClass('enabled');
	}
	$('#speedShift').click(toggleSpeedShifters);

	async function loop() {
		if (gamepadConnected || gamepad.isConnected()) {
			let multi = 1;
			for (let i in btns) {
				let btn = btns[i];
				let query = btn.query();
				// if button is not pressed, query is false and unchanged
				if (!btnStates[i] && !query) {
					continue;
				}
				// if button is held, query is true and unchanged
				if (btnStates[i] && query) {
					// log(i + ' button press held');
					if (i == 'lt') {
						multi = .5;
					} else if (i == 'rt') {
						multi = 5;
					}
					continue;
				}
				// save button state change
				btnStates[i] = query;
				// if button press ended query is false
				if (!query) {
					// log(i + ' button press end');
					continue;
				}
				// if button press just started, query is true
				if (opt.v) {
					log(i + ' button press start');
				}
			}
			let stickL = gamepad.stick('left').query();
			let stickR = gamepad.stick('right').query();
			let gyro = {
				x: ((axises.includes('x')) ? stickR.y : 0),
				y: ((axises.includes('y')) ? stickR.x : 0),
				z: ((axises.includes('z')) ? stickL.x : 0)
			};
			for (axis of axises) {
				if (gyro[axis] > .9) {
					gyro[axis] = -250 * gyro[axis] + 208
					inNuetralPos[axis] = false;
				} else if (gyro[axis] < -.9) {
					gyro[axis] = -250 * gyro[axis] - 208
					inNuetralPos[axis] = false;
				} else if (gyro[axis] < -stickDeadZone || gyro[axis] > stickDeadZone) {
					gyro[axis] = -25 * Math.pow(gyro[axis], 3);
					inNuetralPos[axis] = false;
				} else if (gyro[axis] < stickDeadZone &&
					gyro[axis] > -stickDeadZone) {
					inNuetralPos[axis] = true;
				}
				gyro[axis] *= invert[axis];
				if (speedShift) {
					gyro[axis] *= multi;
				}
			}
			gyro.y *= -1;
			gyroServer.sendMotionData(gyro);

			if (!gamepadConnected) {
				log('gamepad connected!');
				$('#gamepadIndicator').text('Gamepad Connected!');
				gamepadConnected = true;
			}
		}
		requestAnimationFrame(loop);
	}

	loop();

	const wss = new WebSocket.Server({
		port: 1337
	});

	wss.on("connection", function connection(ws) {
		log("WS Connected");
		phoneIsConnected = true;
		$('#phoneIndicator').text('Phone connected!');
		ws.on("message", function incoming(message) {
			// log(message);
			data = JSON.parse(message);
			gyroServer.sendMotionData(data.gyro, null, data.ts);
		});
		ws.on("error", () => {
			phoneIsConnected = false;
			log("WS ERROR");
		});
		ws.on("close", () => {
			phoneIsConnected = false;
			log("WS Disconnected");
			$('#phoneIndicator').text('Phone disconnected');
		});
	});

	/////////////////////////////////////////////////

	let express = require('express');
	let xps = express();

	// set up the template engine
	xps.set('views', './views');
	xps.set('view engine', 'pug');
	xps.use("/js", express.static(path.join(__dirname, '../js')));

	// GET response for '/'
	xps.get('/', function(req, res) {
		res.render('pug/client');
	});

	// start up the server
	xps.listen(8080, function() {
		log(`
## Usage
1. Run Cemu.exe and Checked Options->GamePad mation source->DSU1->By Slot
2. Use your phone‘s browser (safair or chrome) open the following url`);
		let interfaces = require("os").networkInterfaces();
		for (let k in interfaces) {
			for (let i in interfaces[k]) {
				if (
					interfaces[k][i].family == "IPv4" &&
					interfaces[k][i].address != "127.0.0.1"
				) {
					let url = "http://" + interfaces[k][i].address + ":8080";
					log(url);
					$('#phoneURL').text($('#phoneURL').text() + url + ' ');
				}
			}
		}
	});

	require('process').on('uncaughtException', function(err) {
		log(err)
	});
};
