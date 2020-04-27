import { WheelEvent } from 'react';

export function getBgAlpha(dom: HTMLDivElement) {
	var style = window.getComputedStyle(dom);
	var bgc = style.getPropertyValue('background-color');
	if (bgc.indexOf('rgba') === -1) {
		return 1;
	}
	var alpha = bgc.replace(/^.*,(.+)\)/, '$1');
	return parseFloat(alpha);
}

export function toggleBodyStyle(show: boolean) {
	if (show) {
		document.querySelector('body').classList.add('ovh');
		document.querySelector('html').classList.add('ovh');
	} else {
		document.querySelector('body').classList.remove('ovh');
		document.querySelector('html').classList.remove('ovh');
	}
}

export function alphaChange(event: WheelEvent<HTMLDivElement>) {
	var delta = event.deltaY / 120;
	const target = event.target as HTMLDivElement;
	var alpha = getBgAlpha(target);
	if ((delta < 0 && alpha >= 1) || (delta > 0 && alpha <= 0)) {
		return;
	}
	alpha = alpha - delta * 0.05;
	target.style.backgroundColor = 'rgba(0, 0, 0, ' + alpha + ')';
}
