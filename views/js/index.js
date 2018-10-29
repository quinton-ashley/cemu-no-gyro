module.exports = async function(opt) {
	global.__rootDir = opt.__rootDir;
	opt.v = false;
	const log = console.log;

	const gyroServer = require('./gyroServer.js');
	const fs = require('fs-extra');
	const path = require('path');
	const klawSync = require('klaw-sync');
	const md = require('markdown-it')();
	const {
		Mouse,
		Keyboard,
		Gamepad,
		or,
		and
	} = require('contro');
	let gamepad = new Gamepad();

	const $ = require('jquery');
	window.$ = window.jQuery = $;
	window.Bootstrap = require('bootstrap');

	let files = klawSync(path.join(__rootDir, '/views/md'));
	for (let file of files) {
		file = file.path;
		let html = await fs.readFile(file, 'utf8');
		html = '<div class="md">' + md.render(html) + '</div>';
		file = path.parse(file);
		$('#' + file.name).prepend(html);
	}

	let gyro = {
		x: 0,
		y: 0,
		z: 0
	};

	let gyroPos = {
		x: 0,
		y: 0,
		z: 0
	};

	let gamepadConnected = false;
	let btnNames = [
		'a', 'b', 'x', 'y',
		'up', 'down', 'left', 'right',
		'view', 'start'
	];
	let btns = {};
	for (let i of btnNames) {
		btns[i] = gamepad.button(i);
	}
	let stickNue = {
		x: true,
		y: true
	};
	let stickDeadZone = 0.2;
	let btnStates = {};
	for (let i of btnNames) {
		btnStates[i] = false;
	}
	// Xbox One controller mapped to
	// Nintendo Switch controller button layout
	//  Y B  ->  X A
	// X A  ->  Y B
	let map = {
		a: 'b',
		b: 'a',
		x: 'y',
		y: 'x'
	};

	async function loop() {
		if (gamepadConnected || gamepad.isConnected()) {
			for (let i in btns) {
				let btn = btns[i];
				// incomplete maps are okay
				// no one to one mapping necessary
				i = map[i] || i;

				let query = btn.query();
				// if button is not pressed, query is false and unchanged
				if (!btnStates[i] && !query) {
					continue;
				}
				// if button is held, query is true and unchanged
				if (btnStates[i] && query) {
					// log(i + ' button press held');
					continue;
				}
				// save button change
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
			let stickR = gamepad.stick('right').query();
			if (stickR.y < -stickDeadZone || stickR.y > stickDeadZone) {
				stickR.y = -25 * Math.pow(stickR.y, 3)
				stickNue.y = false;
			}
			if (stickR.y < stickDeadZone &&
				stickR.y > -stickDeadZone) {
				gyro.y = 0;
				stickNue.y = true;
			}
			gyroServer.sendMotionData({
				x: stickR.y,
				y: 0,
				z: 0
			});

			if (!gamepadConnected) {
				log('gamepad connected!');
				gamepadConnected = true;
			}
		}
		requestAnimationFrame(loop);
	}

	loop();
};
