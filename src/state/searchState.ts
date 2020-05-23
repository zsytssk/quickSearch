import { EventCom } from '@app/utils/eventCom';
import { useEffect, useState } from 'react';

const StateEvent = {
	Change: 'change',
};
class SearchModel extends EventCom {
	public keyword: string;
	public suffix = '&from=vto';
	public updateKeyword(keyword: string) {
		this.keyword = keyword || 'I love you!';
		this.emit(StateEvent.Change);
	}
}

let state = new SearchModel();
export function getSearchState() {
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

	return [_state, changeIndex] as [SearchModel, number];
}
