import LeftSquareOutlined from '@ant-design/icons/LeftSquareOutlined';
import React, { useEffect, useState } from 'react';
import { getSettingState } from '../../state/settingState';
import { getFavicon } from '@app/utils/utils';
import { Setting } from '@app/utils/chromeUtils';

export function ToolBar() {
	const [setting_state, changeIndex] = getSettingState();
	const [list, setList] = useState<Setting['list']>([]);

	useEffect(() => {
		const list = setting_state?.list;
		setList([...list]);
	}, [changeIndex]);

	return (
		<div className="toolbar">
			<a className="change">
				<LeftSquareOutlined />
			</a>
			<div className="extend">
				{list.map((item, index) => {
					const icon = getFavicon(item.url);
					return (
						<div
							className={`item ${setting_state.cur_index === index ? 'cur' : ''}`}
							onClick={() => {
								setting_state.setSearchIndex(index);
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
