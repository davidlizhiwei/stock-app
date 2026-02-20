# 🚀 GitHub Pages 启用指南

## 自动访问地址

**股票查询系统 GitHub Pages 地址**：
https://davidlizhiwei.github.io/stock-app

---

## 📋 如何启用 GitHub Pages（如果需要手动配置）

### 步骤 1：进入仓库设置

1. 打开 https://github.com/davidlizhiwei/stock-app
2. 点击顶部的 **Settings**（设置）标签

### 步骤 2：配置 Pages

1. 在左侧菜单中找到并点击 **Pages**
2. 在 "Source" 部分：
   - **Branch**: 选择 `main`
   - **Folder**: 选择 `/docs`
3. 点击 **Save** 按钮

### 步骤 3：等待部署

- GitHub 会自动部署你的网站
- 通常需要 1-2 分钟
- 部署完成后，你会看到访问地址

### 步骤 4：访问网站

访问地址格式：
```
https://YOUR_USERNAME.github.io/stock-app
```

对于本项目：
```
https://davidlizhiwei.github.io/stock-app
```

---

## 🎯 使用方法

1. **打开网站**：访问上面的 GitHub Pages 地址
2. **输入 API Key**：
   - 如果你没有 Finnhub API Key，点击 "免费注册获取"
   - 在 https://finnhub.io/register 免费注册
   - 复制你的 API Key 并粘贴到输入框
   - 点击 "保存"
3. **查询股票**：
   - 输入股票代码（如：AAPL, TSLA, MSFT）
   - 点击 "查询" 按钮
   - 查看实时股价和公司信息

---

## 💡 提示

- API Key 会保存在你的浏览器本地存储中，下次访问无需重新输入
- 这是一个纯前端应用，所有 API 请求都直接从你的浏览器发送到 Finnhub
- 完全免费，无需任何服务器

---

## 🔧 自定义（如果你想 Fork 这个项目）

1. Fork 这个仓库到你的 GitHub 账号
2. 启用 GitHub Pages（如上所述）
3. 访问你的版本：`https://YOUR_USERNAME.github.io/stock-app`

---

**祝你使用愉快！** 📈
