---
title: "frp隐藏CMD窗口运行"
date: 2020-04-28T14:53:46
tags: [应用]
feature: /img/code1.jpg
---


新建一个文本文档在开头处写入

```
@echo off
if "%1" == "h" goto begin
mshta vbscript:createobject("wscript.shell").run("""%~nx0"" h",0)(window.close)&&exit
:begin
REM
frpc.exe -c frpc.ini
```
其中frpc.exe -c frpc.ini为运行命令。
另存为.bat文件，放在frp目录下，双击该bat文件会在屏幕中一闪而过。