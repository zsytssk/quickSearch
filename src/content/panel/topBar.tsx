import React, { ChangeEvent, useState, useMemo, useRef, useCallback } from 'react';
import classnames from 'classnames';
import { getUrl } from '@app/utils/chromeUtils';

import LinkOutlined from '@ant-design/icons/LinkOutlined';
import SettingFilled from '@ant-design/icons/SettingFilled';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import MoreOutlined from '@ant-design/icons/MoreOutlined';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import { searchUrl } from '../cusHook/searchUrl';
import { getSearchState } from '../../state/searchState';
import { getSettingState } from '../../state/settingState';
import { getFavicon } from '@app/utils/utils';

export function TopBar() {
	const ref = useRef<HTMLInputElement>();
	const [search_state, searchChangeIndex] = getSearchState();
	const [setting_state, settingChangeIndex] = getSettingState();
	const [editable, setEditable] = useState(false);
	const [showMore, setShowMore] = useState(false);
	const optionUrl = getUrl('options/index.html');

	const toggleMore = useCallback(() => {
		setShowMore(!showMore);
	}, [showMore]);

	const toggleEditable = useCallback(() => {
		setEditable(!editable);
	}, [editable]);

	const onSubmit = useCallback(
		(event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
			event.preventDefault();
			search_state.updateKeyword(ref.current.value);
			toggleEditable();
			return false;
		},
		[editable],
	);

	const [icon, name] = useMemo(() => {
		const item = setting_state?.list?.find((item, index) => {
			return index === setting_state?.cur_index;
		});
		const icon = getFavicon(item.url);
		return [icon, item.name];
	}, [settingChangeIndex]);

	return (
		<div className={classnames({ 'top-bar': true, active: editable })}>
			<form className={classnames({ 'bs-form': true })} onSubmit={onSubmit}>
				<div className="icon-box">
					<img src={icon} alt={name} />
				</div>
				<div className="textBox">
					<input type="text" defaultValue={search_state.keyword} ref={ref} />
					<a className="confirm" onClick={onSubmit}>
						<CheckOutlined />
					</a>
				</div>
				<div className="showBox">
					<div className="content" title="">
						{search_state.keyword}
					</div>
					<a className="search" onClick={toggleEditable}>
						<SearchOutlined />
					</a>
					<a className="more" onClick={toggleMore}>
						<MoreOutlined />
					</a>
				</div>
			</form>
			<div className={classnames({ 'drop-box': true, extend: showMore })} onMouseLeave={toggleMore}>
				<ul>
					<li>
						<a className="external" href={searchUrl(false)} target="_blank">
							<LinkOutlined />
						</a>
					</li>
					<li>
						<a href={optionUrl} target="_blank" className="setting">
							<SettingFilled />
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
}
