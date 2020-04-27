import { useSelector } from 'react-redux';
import { State } from '../contentStore/contentReducer';

export function searchUrl(has_suffix = true) {
	const { searchUrl, keyword, suffix } = useSelector((state: State) => {
		const { keyword, suffix, setting } = state;
		const searchUrl = setting?.list[setting?.curIndex]?.url;

		return { searchUrl, keyword, suffix };
	});

	if (has_suffix) {
		return (searchUrl + keyword + suffix) as string;
	} else {
		return (searchUrl + keyword) as string;
	}
}
