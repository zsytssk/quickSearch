import style from '!css-loader!less-loader!./panel.less';
import React, { MouseEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import root from 'react-shadow';
import { UpdateKeyword, UpdateSetting } from '../contentStore/contentAction';
import { alphaChange, toggleBodyStyle } from '../contentUtils';
import { detectShow } from '../cusHook/detectShow';
import { ToolBar } from './toolBar';
import { TopBar } from './topBar';
import { Box } from './box';

export function Panel() {
	const [show, setShow, keyword] = detectShow();
	const dispatch = useDispatch();

	UpdateSetting(dispatch);

	const toggleShow = () => {
		const next_show = !show;
		setShow(next_show);
	};

	useEffect(() => {
		toggleBodyStyle(show);
	}, [show]);

	useEffect(() => {
		dispatch(UpdateKeyword(keyword));
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
