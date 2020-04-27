import React from 'react';
import { useDispatch } from 'react-redux';
import SyncOutlined from '@ant-design/icons/SyncOutlined';
import { UpdateSearchIndex } from '../contentStore/contentAction';

export function ToolBar() {
	const dispatch = useDispatch();
	return (
		<div className="toolbar">
			<a
				className="change"
				onClick={() => {
					dispatch(UpdateSearchIndex());
				}}
			>
				<SyncOutlined />
			</a>
		</div>
	);
}
