import React, { useState, useEffect } from 'react';
import { Setting, getSetting, setSetting } from '@app/utils/chromeUtils';

alert(1);
export function List() {
	const [state, setState] = useState<Setting>();

	useEffect(() => {
		getSetting().then((Setting) => {
			setState(Setting);
		});
	}, []);

	const onChange = (e) => {
		const val = e.target.value;
		for (const [index, item] of state.list.entries()) {
			if (item.name === val) {
				const new_state = {
					...state,
					curIndex: index,
				};
				setState(new_state);
				setSetting(new_state);
			}
		}
	};

	return (
		<div>
			搜索引擎:
			<span className="searchEngineList" onChange={onChange}>
				{state?.list?.map((item, index) => {
					const { name } = item;
					const checked = index === state.curIndex;
					return (
						<label htmlFor={name}>
							<input type="radio" name="searchEngine" value={name} id={name} checked={checked} />
							{name}
						</label>
					);
				})}
			</span>
		</div>
	);
}
