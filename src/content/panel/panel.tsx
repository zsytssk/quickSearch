import React, { useState, MouseEvent, WheelEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import root from 'react-shadow';
import { TopBar } from './topBar';
import { Con } from './con';
import { ToolBar } from './toolBar';
import { getBgAlpha, toggleBodyStyle } from '../contentUtils';
import { UpdateSetting } from '../contentStore/contentAction';

import style from '!css-loader!less-loader!./panel.less';
import { detectShow } from '../cusHook/detecShow';

export function Panel() {
	const [show, setShow] = detectShow();
	const dispatch = useDispatch();

	UpdateSetting(dispatch);

	const toggleShow = () => {
		const next_show = !show;
		setShow(next_show);

		toggleBodyStyle(next_show);
	};

	useEffect(() => {
		toggleBodyStyle(show);
	}, []);

	useEffect(() => {
		toggleBodyStyle(show);
	}, []);

	const stopProp = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
	};

	function alphaChange(event: WheelEvent<HTMLDivElement>) {
		var delta = event.deltaY / 120;
		const target = event.target as HTMLDivElement;
		var alpha = getBgAlpha(target);
		if ((delta < 0 && alpha >= 1) || (delta > 0 && alpha <= 0)) {
			return;
		}
		alpha = alpha - delta * 0.05;
		target.style.backgroundColor = 'rgba(0, 0, 0, ' + alpha + ')';
	}

	return (
		<root.div>
			<style>{style.toString()}</style>
			{show && (
				<div className="overlay" onClick={toggleShow} onWheel={alphaChange}>
					<div className="bs-box" onClick={stopProp}>
						<TopBar />
						<Con />
						<ToolBar />
					</div>
				</div>
			)}
		</root.div>
	);
}
