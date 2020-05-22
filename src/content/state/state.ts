import { EventCom } from '@app/utils/eventCom';
import { Setting, setSetting } from '@app/utils/chromeUtils';
import { sleep } from '@app/utils/utils';
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

		setSetting({
			list,
			curIndex: new_index,
		}).then(() => {
			this.emit(StateEvent.Change);
		});
	}
	public setSearchIndex(new_index: number) {
		const { list } = this.setting;
		if (new_index > list.length - 1) {
			new_index = 0;
		}
		this.setting.curIndex = new_index;
		setSetting({
			list,
			curIndex: new_index,
		}).then(() => {
			this.emit(StateEvent.Change);
		});
	}
	public initSearchSetting(setting: Setting) {
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
		// 如果不做成异步的就会变成无限死循环
		state.on(StateEvent.Change, fn);
		sleep().then(() => {});
		return () => {
			state.off(StateEvent.Change, fn);
		};
	}, [changeIndex]);

	return [_state, changeIndex] as [StateModel, number];
}
