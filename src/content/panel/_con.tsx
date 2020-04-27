import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../contentStore/contentReducer';

type Props = {
	url: string;
};
export function Con() {
	const [conHeight, setConHeight] = useState(0);
	const { searchUrl, keyword, suffix } = useSelector((state: State) => {
		const { keyword, suffix, setting } = state;
		const searchUrl = setting?.list[setting?.curIndex]?.url;

		return { searchUrl, keyword, suffix };
	});

	useEffect(() => {
		const resize = () => {
			setConHeight(window.innerHeight - 40);
		};
		window.addEventListener('resize', resize);
		resize();

		return () => window.removeEventListener('resize', resize);
	}, []);
	return (
		<div className="con" style={{ height: conHeight }}>
			<iframe src={searchUrl + keyword + suffix} id="quickSearchIframe"></iframe>
		</div>
	);
}
