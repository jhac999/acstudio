# AC STUDIO 和声定制需求收集单 (GitHub Pages 部署版)

这个文件夹包含了部署到 GitHub Pages 所需的所有静态前端文件。

## 包含的文件：
- `index.html`：网页主结构（表单内容、无后端提交通道集成）。
- `style.css`：网页视觉样式（R&B 暗黑胶片风设计）。
- `script.js`：核心交互逻辑（音乐自动播放/点击触发机制、JSON 本地下载、跳转回流控制）。
- `bgm.mp3`：网页背景音乐（支持任意命名，只要代码里的路径对得上）。
- `header_bg.png`：顶部封面大图。

## 部署到 GitHub 的步骤：
1. 登录您的 GitHub 账号，点击右上角的 **+** 号，选择 **New repository**。
2. 随便起个英文名字（比如 `ac-studio-forms`），设置为 **Public**（公开），然后点击 **Create repository**。
3. 进入新仓库后，点击 **"uploading an existing file"**（上传已有文件）链接。
4. 把当前文件夹（`HarmonyRequest_GitHub`）下的 **所有 5 个文件和图片**，一次性拖拽进浏览器的上传框里。
5. 点击绿色的 **Commit changes** 按钮保存。
6. 点击上方导航栏的 **Settings**（设置），在左侧菜单往下找，点击 **Pages**。
7. 在 **Build and deployment** 下的 **Source** 选项，选择 **Deploy from a branch**。
8. 在 **Branch** 下方的下拉框里，选择 **main**（或 master），右侧保持 `/ (root)`，点击 **Save**。
9. 等待大概 1 到 2 分钟，刷新这个页面，顶部就会出现一个带链接的提示：`Your site is live at https://xxx.github.io/...`。

恭喜，您的客户现在可以通过这个链接直接填单了！
