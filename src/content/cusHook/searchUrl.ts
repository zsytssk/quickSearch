import { getSearchState } from '../../state/searchState';
import { getSettingState } from '../../state/settingState';

export function searchUrl(has_suffix = true) {
	const [search_state] = getSearchState();
	const [setting_state] = getSettingState();
	const { keyword, suffix } = search_state;
	const searchUrl = setting_state?.list[setting_state?.cur_index].url;

	if (has_suffix) {
		return (searchUrl + keyword + suffix) as string;
	} else {
		return (searchUrl + keyword) as string;
	}
}
