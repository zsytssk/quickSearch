import React from 'react';
import { Table } from 'antd';

export function Setting() {
	const { Column } = Table;
	const data = [
		{
			key: '1',
			name: 'Brown',
			url: 'Brown',
			template: 'New York No. 1 Lake Park',
		},
	];

	return (
		<Table dataSource={data}>
			<Column title="Name" dataIndex="name" key="name" />
			<Column title="Url" dataIndex="url" key="url" />
			<Column
				title="Action"
				key="action"
				render={(text, record) => (
					<span>
						<a>save</a>
						<a>delete</a>
					</span>
				)}
			/>
		</Table>
	);
}
