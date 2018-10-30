module.exports = async function(opt) {
	global.__rootDir = opt.__rootDir;
	opt.v = false;
	const log = console.log;

	const gyroServer = require('./gyroServer.js');
	const fs = require('fs-extra');
	const opn = require('opn');
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

	let axisesR = ['y'];
	let gamepadConnected = false;
	let stickNue = {
		x: true,
		y: true
	};
	let stickDeadZone = 0.2;

	let files = klawSync(path.join(__rootDir, '/views/md'));
	for (let file of files) {
		file = file.path;
		let html = await fs.readFile(file, 'utf8');
		html = '<div class="md">' + md.render(html) + '</div>';
		file = path.parse(file);
		$('#' + file.name).prepend(html);
	}
	$(document).on('click', 'a[href^="http"]', function(event) {
		event.preventDefault();
		opn(this.href);
	});

	function toggleAxis() {
		let $btn = $(this);
		let axisR = $(this).attr('id')[2];
		$btn.toggleClass('enabled');
		axisesR = [];
		if ($('#rsx').hasClass('enabled')) {
			axisesR.push('x');
		}
		if ($('#rsy').hasClass('enabled')) {
			axisesR.push('y');
		}
	}
	$('#rsx').click(toggleAxis);
	$('#rsy').click(toggleAxis);

	async function loop() {
		if (gamepadConnected || gamepad.isConnected()) {
			let stickR = gamepad.stick('right').query();
			for (axisR of axisesR) {
				if (stickR[axisR] > .9) {
					stickR[axisR] = -250 * stickR[axisR] + 208
					stickNue.y = false;
				} else if (stickR[axisR] < -.9) {
					stickR[axisR] = -250 * stickR[axisR] - 208
					stickNue.y = false;
				} else if (stickR[axisR] < -stickDeadZone || stickR[axisR] > stickDeadZone) {
					stickR[axisR] = -25 * Math.pow(stickR[axisR], 3);
					stickNue.y = false;
				} else if (stickR[axisR] < stickDeadZone &&
					stickR[axisR] > -stickDeadZone) {
					stickNue[axisR] = true;
				}
			}
			// log(stickR);
			gyroServer.sendMotionData({
				x: ((axisesR.includes('y')) ? stickR.y : 0),
				y: ((!axisesR.includes('x')) ? 0 : stickR.x),
				z: 0
			});

			if (!gamepadConnected) {
				log('gamepad connected!');
				$('#gamepadIndicator').text('Gamepad Connected!');
				gamepadConnected = true;
			}
		}
		requestAnimationFrame(loop);
	}

	loop();
};
