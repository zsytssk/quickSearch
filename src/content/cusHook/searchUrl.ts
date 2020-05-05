import { getState } from '../state/state';

export function searchUrl(has_suffix = true) {
	const [state] = getState();
	const { setting, keyword, suffix } = state;
	const searchUrl = setting?.list[setting?.curIndex].url;

	if (has_suffix) {
		return (searchUrl + keyword + suffix) as string;
	} else {
		return (searchUrl + keyword) as string;
	}
}
