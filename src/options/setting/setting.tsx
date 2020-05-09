import React, { useEffect } from 'react';
import { Table, Input } from 'antd';
import { getState } from '../state/state';
import { getSetting } from '@app/utils/chromeUtils';
import style from './setting.module.less';

export function Setting() {
	const { Column } = Table;
	const [state] = getState();

	useEffect(() => {
		getSetting().then((setting) => {
			state.updateSearchSetting(setting);
		});
	}, []);

	const data = state?.list?.map((item, index) => {
		return {
			key: `${index}`,
			name: item.name,
			url: item.url,
		};
	});

	if (!data) {
		return null;
	}
	return (
		<Table dataSource={data} className={style.setting}>
			<Column
				title="Name"
				dataIndex="name"
				render={(text, record) => {
					console.log(`1`, text, record);
					return <Input defaultValue={text} />;
				}}
				width={200}
			/>
			<Column
				title="Url"
				dataIndex="url"
				render={(text, record) => {
					return <Input defaultValue={text} />;
				}}
				width={400}
			/>
			<Column
				width={200}
				title="Action"
				key="action"
				render={(text, record) => (
					<span className={style.action}>
						<a>save</a>
						<a>delete</a>
					</span>
				)}
			/>
		</Table>
	);
}
