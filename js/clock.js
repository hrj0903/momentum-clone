const clock = document.querySelector('h2#clock');

function getClock() {
	clock.innerText = new Date().toLocaleTimeString();
}

getClock();
setInterval(getClock, 1000);
