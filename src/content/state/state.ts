import { EventCom } from '@app/utils/eventCom';
import { Setting, setSetting } from '@app/utils/chromeUtils';
import { useState, useEffect } from 'react';

const StateEvent = {
	Change: 'change',
};
class StateModel extends EventCom {
	public keyword: string;
	public suffix = '&from=vto';
	public setting = {} as Setting;
	public updateKeyword(keyword: string) {
		this.keyword = keyword || 'I love you!';
		this.emit(StateEvent.Change);
	}
	public addSearchIndex() {
		const { list, curIndex } = this.setting;
		let new_index = curIndex + 1;
		if (new_index > list.length - 1) {
			new_index = 0;
		}

		this.setting.curIndex = new_index;

		this.emit(StateEvent.Change);
		setSetting({
			list,
			curIndex: new_index,
		});
	}
	public setSearchIndex(new_index: number) {
		const { list } = this.setting;
		if (new_index > list.length - 1) {
			new_index = 0;
		}
		this.setting.curIndex = new_index;

		/** 如果放在异步冲就会导致 卡死... */
		this.emit(StateEvent.Change);
		setSetting({
			list,
			curIndex: new_index,
		});
	}
	public updateSearchSetting(setting: Setting) {
		this.setting = setting;
		this.emit(StateEvent.Change);
	}
}

let state = new StateModel();
export function getState() {
	const [_state, setState] = useState(state);
	const [changeIndex, setChangeIndex] = useState(0);

	useEffect(() => {
		const fn = () => {
			setState(state);
			setChangeIndex(changeIndex + 1);
		};
		state.on(StateEvent.Change, fn);
		return () => {
			state.off(StateEvent.Change, fn);
		};
	}, [changeIndex]);

	return [_state, changeIndex] as [StateModel, number];
}
