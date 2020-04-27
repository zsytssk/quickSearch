if (location.href.indexOf('baidu') !== -1) {
	// baidu
	document.querySelector('html').classList.add('baidu');
} else if (location.href.indexOf('google') !== -1) {
	// google
	document.querySelector('html').classList.add('google');

	window.onload = function () {
		changeLinktarget('google');
	};
}

NodeList.prototype.forEach = Array.prototype.forEach;

function changeLinktarget(domain) {
	document.querySelectorAll('a').forEach(function (ele, index) {
		if (ele.href.indexOf(domain) !== -1 && ele.target !== '_blank') {
			ele.href = ele.href + '&from=vto';
		}
	});
}
