import React, { useEffect, useState } from 'react';
import Table from 'antd/es/table';
import Input from 'antd/es/input';
import Button from 'antd/es/button';
import { getState } from '../state/state';
import { getSetting, SettingItem } from '@app/utils/chromeUtils';

import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import SaveFilled from '@ant-design/icons/SaveFilled';

import style from './setting.module.less';
import 'antd/es/table/style/index.css';
import 'antd/es/input/style/index.css';
import 'antd/es/button/style/index.css';
import 'antd/es/pagination/style/index.css';
import { createRandomString } from '@app/utils/utils';

type ShowItem = Without<SettingItem, 'id'> & {
	key: string;
	status: 'empty' | 'normal' | 'modified';
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
				...item,
				key: item.id,
				status: 'normal' as ShowItem['status'],
			};
		});
		console.log(`test:>`, _show_state);
		setShowState(_show_state);
	}, [state_index]);

	const deleteFn = (item: ShowItem) => {
		const { cur_index } = state;
		const new_list = state?.list?.filter((_item) => {
			return _item.name !== item.name;
		});
		state.updateSearchSetting({ list: new_list, curIndex: cur_index });
	};

	const addFn = () => {
		const id = createRandomString();
		setShowState([
			{
				key: id,
				name: '',
				url: '',
				status: 'empty' as ShowItem['status'],
			},
			...show_state,
		]);
	};

	const saveFn = (item: ShowItem) => {
		const { list, cur_index } = state;
		const { key, ...other } = item;
		const index = list.findIndex((_item) => {
			return item.key === _item.id;
		});

		if (index !== -1) {
			list[index] = {
				id: key,
				...other,
			};
		} else {
			list.unshift({
				id: key,
				...other,
			});
		}
		state.updateSearchSetting({ list, curIndex: cur_index });
	};

	const updateFn = (item: ShowItem) => {
		const new_state = [] as ShowItem[];

		for (const _item of show_state) {
			if (item.key === _item.key) {
				new_state.push(item);
			} else {
				new_state.push(_item);
			}
		}
		setShowState(new_state);
	};

	if (!show_state) {
		return null;
	}
	return (
		<>
			<div>
				<Button
					onClick={() => {
						addFn();
					}}
				>
					add
				</Button>
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
									updateFn({
										...record,
										name: event.target.value,
										status: 'modified',
									});
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
									updateFn({
										...record,
										url: event.target.value,
										status: 'modified',
									});
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
					render={(text, record: ShowItem) => {
						const { status } = record;
						const can_save = status !== 'normal';
						const can_delete = status !== 'empty';
						return (
							<span className={style.action}>
								{can_save && (
									<SaveFilled
										onClick={() => {
											saveFn(record);
										}}
									/>
								)}

								{can_delete && (
									<DeleteOutlined
										onClick={() => {
											deleteFn(record);
										}}
									/>
								)}
							</span>
						);
					}}
				/>
			</Table>
		</>
	);
}
