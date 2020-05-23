import { EventCom } from '@app/utils/eventCom';
import { Setting, setSetting } from '@app/utils/chromeUtils';
import { sleep } from '@app/utils/utils';
import { useState, useEffect } from 'react';

const StateEvent = {
	Change: 'change',
};
class SettingModel extends EventCom {
	public list: Setting['list'];
	public cur_index: number;
	public updateSearchSetting(setting: Setting) {
		const { list } = setting;
		let { curIndex } = setting;
		this.list = list;
		if (curIndex >= list.length) {
			curIndex = list.length - 1;
		}
		this.cur_index = curIndex;

		setSetting({
			list,
			curIndex,
		}).then(() => {
			this.emit(StateEvent.Change);
		});
	}
	public setSearchIndex(new_index: number) {
		const { list } = this;
		if (new_index > list.length - 1) {
			new_index = 0;
		}
		this.cur_index = new_index;
		setSetting({
			list,
			curIndex: new_index,
		}).then(() => {
			this.emit(StateEvent.Change);
		});
	}
	public initSearchSetting(setting: Setting) {
		const { list, curIndex } = setting;
		this.list = list;
		this.cur_index = curIndex;
		this.emit(StateEvent.Change);
	}
}

let state = new SettingModel();
export function getSettingState() {
	const [_state, setState] = useState(state);
	const [changeIndex, setChangeIndex] = useState(0);

	useEffect(() => {
		const fn = () => {
			setState(state);
			setChangeIndex(changeIndex + 1);
		};
		// 如果不做成异步的就会变成无限死循环
		state.on(StateEvent.Change, fn);
		return () => {
			state.off(StateEvent.Change, fn);
		};
	}, [changeIndex]);

	return [_state, changeIndex] as [SettingModel, number];
}
