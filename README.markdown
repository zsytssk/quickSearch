# Sublime Text 3 plugin: quick Open  
you're not always want open everthing in sublime;  
eg you just want open folder in file explorer or .psd in photoshop;  
QuickOpen can open file or directory with system default way  

## function  
☐ QuickOpen  
-| default shortcut: Alt+A  
-| open file or directory with system default way  
-> you can set need open outside with file in quickOpen.sublime-settings  
-> "openOutList": [".psd", ".lnk", ".zip", "..."]  

☐ CompletePath  
-> default shortcut: Alt+A  
-| complete file path in show_quick_panel  

## tip  
-| search a lot file need time, you can set maxSearchTime  
-> 3s "maxSearchTime": 3000  
---&&---  
-| if time is out and search is not complete, will show a alert window, you can hide it  
-> "hideMessageDialog": true  


## 常用功能  
-| 在explorer中打开文件夹  
-| 用默认的软件打开相关文件  
-> 比如 .psd 用 photoshop 打开  
-> 你可以自己在quickOpen.sublime-settings设置需要文件类型  
-> "openOutList": [".psd", ".lnk", ".zip", "..."]  

-| 在 show_quick_panel 中, 自动补全文件地址  

## 常见问题  
-| 文件夹文件过多, 查找需要时间  
-> 你可以设置 最大搜索时间 maxSearchTime  
-> 如果是3s 就设置为 "maxSearchTime": 3000  
---&&---  
-| 同时超过时间还没有搜索完, 会弹出一个提示框你可以选择去掉  
-> "hideMessageDialog": true  