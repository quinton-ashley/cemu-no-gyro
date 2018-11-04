if (!localStorage)
	localStorage = {}
var scale = localStorage.scaleV13 || 1;
var screen = localStorage.screen || 'v';
document.getElementById("scale").value = scale
document.getElementById("screen").value = screen

function scaleChange(val) {
	scale = val
	localStorage.scaleV13 = val
}

function screenChange(val) {
	screen = val
	localStorage.screen = val
}
var time = 0;
var bar = window.location.href;
var wsAddress = `ws://${bar.match(/^https?:\/\/([^:]+).+$/)[1]}:1337`;
console.log(wsAddress);
var ws = new WebSocket(wsAddress);
ws.onopen = function(ws_evnt) {
	window.document.getElementById("lblConnected").textContent = "Connected";
	window.ondevicemotion = function(motion) {
		//x(red) z(blue) y(green)
		var gyroV = {
			x: scale * motion.rotationRate.alpha,
			z: scale * motion.rotationRate.beta,
			y: -scale * motion.rotationRate.gamma,
		}
		var gyroH = {
			z: scale * motion.rotationRate.alpha,
			x: -scale * motion.rotationRate.beta,
			y: -scale * motion.rotationRate.gamma,
		}
		time++;
		if (time % 16 == 0) {
			document.getElementById("x").textContent = 'x:' + Math.round(gyroV.x)
			document.getElementById("y").textContent = 'y:' + Math.round(gyroV.y)
			document.getElementById("z").textContent = 'z:' + Math.round(gyroV.z)
		}
		document.getElementById("s").textContent = 'Current Sensitivity:' + scale
		var data = {
			ts: parseInt(Date.now() * 1000),
			gyro: screen == 'v' ? gyroV : gyroH,
			acceleration: {
				x: 0,
				y: 0,
				z: 0
			}
		}
		ws.send(JSON.stringify(data, function(key, val) {
			return val.toFixed ? Number(val.toFixed(20)) : val;
		}));
	};
};
ws.onclose = function() {
	alert('WebSocket is Disconnecte! Please refresh this page and retry it.')
	window.document.getElementById("lblConnected").textContent = "WebSocket is closed! Please refresh this page and retry it.";
}
