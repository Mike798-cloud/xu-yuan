# 《许愿柳》静态网页成品

入口：`index.html`。建议通过静态服务器访问（GitHub Pages / Cloudflare Pages / `python -m http.server`）。

作品为纯 HTML / CSS / JavaScript，无第三方运行时依赖。六个站点采用不同的 2012—2017 年网页与数据载体：高校门户、Discuz 旧论坛、校媒期号索引、后勤工单系统、历史只读节点与无归属静态页。同站链接在当前标签打开，每站唯一站外出口由玩家主动点击并新开标签。

## 本地预览

```bash
python -m http.server 8000
```

随后访问 `http://localhost:8000/`。

## 发布处理

`release_process.bat` 用于 Windows 发布前处理：统一 HTML/CSS/JS/JSON/MD/TXT 为 UTF-8 无 BOM，并清理 `.tmp`、`.bak`、`.DS_Store` 与 `__pycache__`。

最终压缩包内文件已按同等规则完成处理，并在处理后重新进行完整性校验。
