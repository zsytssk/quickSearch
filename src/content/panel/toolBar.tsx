import LeftSquareOutlined from '@ant-design/icons/LeftSquareOutlined';
import React from 'react';
import { getState } from '../state/state';
import { getFavicon } from '@app/utils/utils';

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
				<LeftSquareOutlined />
			</a>
			<div className="extend">
				{state?.setting?.list.map((item, index) => {
					const icon = getFavicon(item.url);
					return (
						<div
							className={`item ${state.setting.curIndex === index ? 'cur' : ''}`}
							onClick={() => {
								state.setSearchIndex(index);
							}}
							key={item.id}
						>
							<img src={icon} alt={item.name} />
						</div>
					);
				})}
			</div>
		</div>
	);
}
