import { Action, ACTIONS } from './contentAction';
import { Setting } from '@app/utils/chromeUtils';

const initState = {
	keyword: 'test',
	suffix: '&from=vto',
	setting: {} as Setting,
};

export type State = typeof initState;

export const reducer = (state = initState, action: Action<string>) => {
	if (action.type === ACTIONS.UPDATE_KEYWORD) {
		return { ...state, keyword: action.data };
	}
	if (action.type === ACTIONS.UPDATE_SETTING) {
		return { ...state, setting: action.data };
	}
	if (action.type === ACTIONS.UPDATE_SEARCH_INDEX) {
		return {
			...state,
			setting: {
				...state.setting,
				curIndex: action.data,
			},
		};
	}

	return state;
};
