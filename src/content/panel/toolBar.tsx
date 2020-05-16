import LeftSquareOutlined from '@ant-design/icons/LeftSquareOutlined';
import React, { useEffect, useState } from 'react';
import { getState } from '../state/state';
import { getFavicon } from '@app/utils/utils';
import { Setting } from '@app/utils/chromeUtils';

export function ToolBar() {
	const [state, changeIndex] = getState();
	const [list, setList] = useState<Setting['list']>([]);

	useEffect(() => {
		const list = state?.setting?.list;
		setList([...list]);
	}, [changeIndex]);

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
				{list.map((item, index) => {
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
