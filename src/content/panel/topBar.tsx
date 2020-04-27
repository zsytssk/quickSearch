import React, { ChangeEvent, useState } from 'react';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateKeyword } from '../contentStore/contentAction';
import { getUrl } from '@app/utils/chromeUtils';

export function TopBar() {
	const [editable, setEditable] = useState(false);
	const [searchWord, setSearchWord] = useState('');
	const [showMore, setShowMore] = useState(false);

	const optionUrl = getUrl('options/index.html');
	const dispatch = useDispatch();
	const { keyword } = useSelector((state) => {
		const { searchUrl, keyword } = state;
		return { searchUrl, keyword };
	});
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchWord(e.target.value);
	};
	const toggleEditable = () => {
		setEditable(!editable);
	};
	const toggleMore = () => {
		setShowMore(!showMore);
	};
	const onSubmit = (
		event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLAnchorElement, MouseEvent>,
	) => {
		event.preventDefault();
		dispatch(UpdateKeyword(searchWord));
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
						确定
					</a>
					<input type="text" onChange={onChange} />
				</div>
				<div className="fr">
					<a className="search" onClick={toggleEditable}>
						搜索
					</a>
					<a className="more" onClick={toggleMore}>
						更多
					</a>
				</div>
			</form>
			<div className={classnames({ 'drop-box': true, extend: showMore })} onMouseLeave={toggleMore}>
				<ul>
					<li>
						<a className="external" target="_blank">
							<i className="fa fa-external-link"></i>弹出
						</a>
					</li>
					<li>
						<a href={optionUrl} target="_blank" className="setting">
							<i className="fa fa-cog"></i>选项
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
}
