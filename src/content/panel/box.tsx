import React, { useEffect, useState } from 'react';
import { searchUrl } from '../cusHook/searchUrl';

type Props = {
	url: string;
};
export function Box() {
	const [conHeight, setConHeight] = useState(0);
	const url = searchUrl();

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
			<iframe src={url} id="vtoIframe"></iframe>
		</div>
	);
}
