import { EventCom } from '@app/utils/eventCom';
import { Setting, setSetting } from '@app/utils/chromeUtils';
import { useState, useEffect } from 'react';

const StateEvent = {
	Change: 'change',
};
class StateModel extends EventCom {
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
}

let state = new StateModel();
export function getState() {
	const [_state, setState] = useState(state);
	const [change_index, setChangeIndex] = useState(0);

	useEffect(() => {
		const fn = () => {
			setState(state);
			setChangeIndex(change_index + 1);
		};
		state.on(StateEvent.Change, fn);
		return () => {
			state.off(StateEvent.Change, fn);
		};
	}, [change_index]);

	return [_state, change_index] as [StateModel, number];
}
