import { useState, useEffect } from 'react';

export function detectShow() {
	const [show, setShow] = useState(false);
	const [keyword, setKeyword] = useState('');

	useEffect(() => {
		const fn = (message: {
			word: string;
			runSearch: boolean;
			edit: boolean;
			esc: boolean;
			changeSearchEngine: boolean;
		}) => {
			setKeyword(message.word);

			if (message.runSearch) {
				setShow(!show);
			}
		};
		chrome.runtime.onMessage.addListener(fn);
		return () => {
			chrome.runtime.onMessage.removeListener(fn);
		};
	}, [show, keyword]);

	return [show, setShow, keyword] as [boolean, typeof setShow, string];
}
