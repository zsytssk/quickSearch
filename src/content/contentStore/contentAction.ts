import { Dispatch } from 'redux';
import { State } from './contentReducer';
import { getSetting } from '@app/utils/chromeUtils';

export const ACTIONS = {
	UPDATE_SETTING: 'UPDATE_SETTING',
	UPDATE_SEARCH_INDEX: 'UPDATE_SEARCH_INDEX',
	UPDATE_KEYWORD: 'UPDATE_KEYWORD',
};
export type Action<T> = {
	type: string;
	data: T;
};
export const UpdateKeyword = (keyword: string) => {
	return {
		type: ACTIONS.UPDATE_KEYWORD,
		data: keyword,
	} as Action<string>;
};

export const UpdateSetting = (dispatch: Dispatch) => {
	getSetting().then((setting) => {
		dispatch({ type: ACTIONS.UPDATE_SETTING, data: setting });
	});
};

export const UpdateSearchIndex = () => {
	return (dispatch: Dispatch, getState: () => State) => {
		const state = getState();
		const { list, curIndex } = state.setting;
		let new_index = curIndex + 1;
		if (new_index > list.length - 1) {
			new_index = 0;
		}
		dispatch({ type: ACTIONS.UPDATE_SEARCH_INDEX, data: new_index });
	};
};
