import style from '!css-loader!less-loader!./panel.less';
import React, { MouseEvent, useEffect } from 'react';
import root from 'react-shadow';
import { alphaChange, toggleBodyStyle } from '../contentUtils';
import { detectShow } from '../cusHook/detectShow';
import { ToolBar } from './toolBar';
import { TopBar } from './topBar';
import { Box } from './box';
import { getState } from '../state/state';
import { getSetting } from '@app/utils/chromeUtils';

export function Panel() {
	const [state] = getState();
	const [show, setShow, keyword] = detectShow();

	useEffect(() => {
		getSetting().then((setting) => {
			state.initSearchSetting(setting);
		});
	}, []);

	const toggleShow = () => {
		const next_show = !show;
		setShow(next_show);
	};

	useEffect(() => {
		toggleBodyStyle(show);
	}, [show]);

	useEffect(() => {
		state.updateKeyword(keyword);
	}, [keyword]);

	useEffect(() => {
		toggleBodyStyle(show);
	}, []);

	const stopProp = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
	};

	return (
		<root.div>
			<style>{style.toString()}</style>
			{show && (
				<div className="overlay" onClick={toggleShow} onWheel={alphaChange}>
					<div className="bs-box" onClick={stopProp}>
						<TopBar />
						<Box />
						<ToolBar />
					</div>
				</div>
			)}
		</root.div>
	);
}
