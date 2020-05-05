import React, { ChangeEvent, useState } from 'react';
import classnames from 'classnames';
import { getUrl } from '@app/utils/chromeUtils';

import LinkOutlined from '@ant-design/icons/LinkOutlined';
import SettingFilled from '@ant-design/icons/SettingFilled';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import MoreOutlined from '@ant-design/icons/MoreOutlined';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import { searchUrl } from '../cusHook/searchUrl';
import { getState } from '../state/state';

export function TopBar() {
	const [state] = getState();
	const [editable, setEditable] = useState(false);
	const [searchWord, setSearchWord] = useState('');
	const [showMore, setShowMore] = useState(false);
	const { keyword } = state;
	const optionUrl = getUrl('options/index.html');
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchWord(e.target.value);
	};
	const toggleEditable = () => {
		setEditable(!editable);
	};
	const toggleMore = () => {
		setShowMore(!showMore);
	};
	const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		e.target.select();
		setSearchWord(e.target.value);
	};
	const onSubmit = (
		event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLAnchorElement, MouseEvent>,
	) => {
		event.preventDefault();
		state.updateKeyword(searchWord);
		toggleEditable();
		return false;
	};

	return (
		<div className="top-bar">
			<form className={classnames({ 'bs-form': true, active: editable })} onSubmit={onSubmit}>
				<div className="fl">
					<div className="content" title="">
						{keyword}
					</div>
					<a className="confirm" onClick={onSubmit}>
						<CheckOutlined />
					</a>
					<input type="text" defaultValue={keyword} onFocus={handleFocus} onChange={onChange} />
				</div>
				<div className="fr">
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
