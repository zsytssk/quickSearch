import React, { useEffect, useState } from 'react';
import { Table, Input } from 'antd';
import { getState } from '../state/state';
import { getSetting, SettingItem } from '@app/utils/chromeUtils';
import style from './setting.module.less';

type ShowItem = SettingItem & {
	key: string;
};
export function Setting() {
	const { Column } = Table;
	const [show_state, setShowState] = useState<ShowItem[]>();
	const [state, state_index] = getState();

	useEffect(() => {
		getSetting().then((setting) => {
			state.updateSearchSetting(setting);
		});
	}, []);

	useEffect(() => {
		const _show_state = state?.list?.map((item, index) => {
			return {
				key: `${name}:${index}`,
				name: item.name,
				url: item.url,
			};
		});
		setShowState(_show_state);
	}, [state_index]);

	const deleteFn = (item: SettingItem) => {
		const { list, cur_index } = state;
		const new_list = state?.list?.filter((_item) => {
			return _item.name !== item.name;
		});
		state.updateSearchSetting({ list: new_list, curIndex: cur_index });
	};

	const addFn = () => {
		setShowState([
			{
				key: 'add',
				name: '',
				url: '',
			},
			...show_state,
		]);
	};

	const saveFn = (item: ShowItem) => {
		const { list, cur_index } = state;
		const { name, url } = item;
		list.unshift({
			name,
			url,
		});
		state.updateSearchSetting({ list, curIndex: cur_index });
	};

	if (!show_state) {
		return null;
	}
	return (
		<>
			<div>
				<button
					onClick={() => {
						addFn();
					}}
				>
					add
				</button>
			</div>
			<Table dataSource={show_state} className={style.setting}>
				<Column
					title="Name"
					dataIndex="name"
					render={(text, record: ShowItem) => {
						return (
							<Input
								defaultValue={text}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
									record.name = event.target.value;
								}}
							/>
						);
					}}
					width={200}
				/>
				<Column
					title="Url"
					dataIndex="url"
					render={(text, record: ShowItem) => {
						return (
							<Input
								defaultValue={text}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
									record.url = event.target.value;
								}}
							/>
						);
					}}
					width={400}
				/>
				<Column
					width={200}
					title="Action"
					key="action"
					render={(text, record: ShowItem) => (
						<span className={style.action}>
							<a
								onClick={() => {
									saveFn(record);
								}}
							>
								save
							</a>
							<a
								onClick={() => {
									deleteFn(record);
								}}
							>
								delete
							</a>
						</span>
					)}
				/>
			</Table>
		</>
	);
}
