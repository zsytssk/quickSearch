import SyncOutlined from '@ant-design/icons/SyncOutlined';
import React from 'react';
import { getState } from '../state/state';

export function ToolBar() {
	const [state] = getState();
	return (
		<div className="toolbar">
			<a
				className="change"
				onClick={() => {
					state.updateSearchIndex(state.setting.curIndex + 1);
				}}
			>
				<SyncOutlined />
			</a>
		</div>
	);
}
