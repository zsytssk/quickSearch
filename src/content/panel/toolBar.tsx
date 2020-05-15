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
					state.addSearchIndex();
				}}
			>
				<SyncOutlined />
			</a>
			<div className="extend">
				{state?.setting?.list.map((item, index) => {
					return <div className="item">{item.name}</div>;
				})}
			</div>
		</div>
	);
}
