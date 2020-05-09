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
		const { list, curIndex } = setting;
		this.list = list;
		this.cur_index = curIndex;
		setSetting(setting).then(() => {
			this.emit(StateEvent.Change);
		});
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

	return [_state] as [StateModel];
}
