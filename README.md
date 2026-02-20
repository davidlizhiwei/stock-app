# 📈 股票查询系统 (Stock Query System)

一个基于 Flask 的 Web 股票查询应用，使用 Finnhub API 获取实时股票数据。

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![Flask](https://img.shields.io/badge/Flask-3.0.0-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## ✨ 功能特性

- 🔍 **实时股价查询** - 获取美股实时价格
- 📊 **股票详情** - 显示开盘价、最高价、最低价、昨收价
- 🏢 **公司信息** - 查看公司简介、行业、CEO、员工数等
- 🔎 **智能搜索** - 支持股票代码和公司名称搜索
- 🎨 **美观界面** - 响应式设计，支持移动端访问
- ⚡ **快速响应** - 实时数据，秒级响应

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/YOUR_USERNAME/stock-app.git
cd stock-app
```

### 2. 安装依赖

```bash
pip3 install -r requirements.txt
```

### 3. 配置 API Key

编辑 `.env` 文件，设置你的 Finnhub API Key：

```bash
FINNHUB_API_KEY=your_api_key_here
```

> 获取免费 API Key: [https://finnhub.io/](https://finnhub.io/)

### 4. 运行应用

```bash
python3 app.py
```

### 5. 访问应用

打开浏览器访问：http://localhost:5000

## 📸 截图

![应用截图](screenshots/screenshot.png)

## 🛠️ 技术栈

- **Backend**: Python 3.8+, Flask 3.0.0
- **Frontend**: HTML5, CSS3, JavaScript (原生)
- **API**: Finnhub Stock API
- **部署**: 支持本地运行和云服务器部署

## 📁 项目结构

```
stock-app/
├── app.py              # Flask 主应用
├── .env                # 环境变量配置
├── requirements.txt    # Python 依赖
├── README.md          # 项目说明
├── static/            # 静态文件
│   ├── style.css      # 样式表
│   └── script.js      # JavaScript
└── templates/         # HTML 模板
    └── index.html     # 主页面
```

## 🔌 API 端点

| 端点 | 方法 | 描述 |
|------|------|------|
| `/` | GET | 主页面 |
| `/api/quote/<symbol>` | GET | 获取股票报价 |
| `/api/profile/<symbol>` | GET | 获取公司简介 |
| `/api/symbols` | GET | 获取股票列表 |
| `/api/search?q=<query>` | GET | 搜索股票 |

## 💡 使用示例

查询苹果公司股票：
1. 在搜索框输入 `AAPL`
2. 点击查询或按回车
3. 查看实时股价和公司信息

搜索股票：
1. 输入关键词（如 `Apple`）
2. 从下拉列表选择股票
3. 自动执行查询

## 🔐 安全提示

- ⚠️ 不要将 `.env` 文件提交到 Git
- ⚠️ 不要将 API Key 公开分享
- ✅ 使用 `.gitignore` 忽略敏感文件

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📧 联系方式

如有问题或建议，请提交 Issue 或联系作者。

---

**Made with ❤️ using Flask & Finnhub API**
