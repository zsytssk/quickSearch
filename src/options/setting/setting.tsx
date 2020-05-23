import React, { useEffect, useState } from 'react';
import Table from 'antd/es/table';
import Input from 'antd/es/input';
import Button from 'antd/es/button';
import { getSettingState } from '../../state/settingState';
import { getSetting, SettingItem } from '@app/utils/chromeUtils';
import { createRandomString, getFavicon } from '@app/utils/utils';

import SaveOutlined from '@ant-design/icons/lib/icons/SaveOutlined';
import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined';
import DeleteOutlined from '@ant-design/icons/lib/icons/DeleteOutlined';

import style from './setting.module.less';

import 'antd/es/table/style/index.css';
import 'antd/es/input/style/index.css';
import 'antd/es/button/style/index.css';

type ShowItem = Without<SettingItem, 'id'> & {
	key: string;
	status: 'empty' | 'normal' | 'modified';
};

let a: ShowItem;

export function Setting() {
	const { Column } = Table;
	const [show_state, setShowState] = useState<ShowItem[]>();
	const [setting_state, setting_state_index] = getSettingState();

	useEffect(() => {
		getSetting().then((setting) => {
			setting_state.updateSearchSetting(setting);
		});
	}, []);

	useEffect(() => {
		const _show_state =
			setting_state?.list?.map((item, index) => {
				const { id, ...other } = item;
				return {
					...other,
					key: id,
					status: 'normal' as ShowItem['status'],
				};
			}) || [];
		const first = {
			status: 'empty',
			key: createRandomString(),
			name: '',
			url: '',
		} as ShowItem;
		_show_state.unshift(first);
		setShowState(_show_state);
	}, [setting_state_index]);

	const deleteFn = (item: ShowItem) => {
		const { cur_index } = setting_state;
		const new_list = setting_state?.list?.filter((_item) => {
			return _item.name !== item.name;
		});
		setting_state.updateSearchSetting({ list: new_list, curIndex: cur_index });
	};

	const saveFn = (item: ShowItem) => {
		const { list, cur_index } = setting_state;
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
		setting_state.updateSearchSetting({ list, curIndex: cur_index });
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
			<Table dataSource={show_state} className={style.setting} pagination={false}>
				<Column
					title="Icon"
					dataIndex="name"
					render={(text, record: ShowItem) => {
						const icon = getFavicon(record?.url);
						return <img src={icon} style={{ width: '30px' }} />;
					}}
					width={200}
				/>
				<Column
					title="Name"
					dataIndex="name"
					render={(text, record: ShowItem) => {
						const { status } = record;
						const new_status = status === 'empty' ? 'empty' : 'modified';
						console.log(`test:>`, status, new_status);
						return (
							<Input
								defaultValue={text}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
									updateFn({
										...record,
										name: event.target.value,
										status: new_status,
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
						const { status } = record;
						const new_status = status === 'empty' ? 'empty' : 'modified';
						return (
							<Input
								defaultValue={text}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
									updateFn({
										...record,
										url: event.target.value,
										status: new_status,
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
						const can_add = status === 'empty';
						const can_save = status === 'modified';
						const can_delete = status !== 'empty';
						return (
							<span className={style.action}>
								{can_add && (
									<Button
										shape="circle"
										onClick={() => {
											saveFn(record);
										}}
									>
										<PlusOutlined />
									</Button>
								)}

								{can_save && (
									<Button
										shape="circle"
										onClick={() => {
											saveFn(record);
										}}
									>
										<SaveOutlined />
									</Button>
								)}

								{can_delete && (
									<Button
										shape="circle"
										onClick={() => {
											deleteFn(record);
										}}
									>
										<DeleteOutlined />
									</Button>
								)}
							</span>
						);
					}}
				/>
			</Table>
		</>
	);
}
