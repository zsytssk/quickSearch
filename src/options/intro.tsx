import React from 'react';

export function Intro() {
	return (
		<div>
			<div className="help-list">
				<ul>
					<li>
						<span>esc</span> 关闭搜索侧边栏
					</li>
					<li>
						<span>alt+q</span> 打开搜索侧边栏
					</li>
					<li>
						<span>alt+e</span> 编辑搜索文字
					</li>
					<li>
						<span>alt+C</span> 切换搜索引擎
					</li>
					<li>
						你可以自定义快捷键 打开 chrome://extensions/ 滚动到页面最底部 点击 &lt;键盘快捷键&gt;
					</li>
				</ul>
			</div>
		</div>
	);
}
