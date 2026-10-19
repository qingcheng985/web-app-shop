# Northline

面向海外消费者的选购站，支持中英文切换。浏览商品、按条件缩小范围、查看规格、放入购物袋，并完成一次模拟下单。价格为美元，配送地区只影响展示用运费。

## 技术栈

- TypeScript
- React 19（函数组件、Hooks）
- Vite
- React Router
- Tailwind CSS v4（`@tailwindcss/vite`）
- i18next + react-i18next（中英文，语言存在 `localStorage`）
- 状态：React Context + `useReducer`
- 持久化：`localStorage`（购物袋、配送地区、语言）
- 数据：`src/data/catalog.ts` 静态商品，文案在 `src/i18n/en.ts` 与 `src/i18n/zh.ts`，图片来自 Unsplash

没有后端、登录和真实支付。

## 启动

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
npm run preview
```

开发服务器：`http://localhost:8888`

## 部署到 Vercel

1. 打开 [vercel.com](https://vercel.com)，用 GitHub 登录。
2. Import 仓库 `qingcheng985/web-app-shop`。
3. 保持默认：Framework = Vite，Build = `npm run build`，Output = `dist`。
4. Deploy。仓库根目录的 `vercel.json` 已配置 SPA 路由回退。

线上验证：打开首页 → 进入商品详情并刷新 → 加入购物袋 → 模拟下单。

## 已完成

- 商品列表：关键词搜索、分类、价格区间、排序、空状态
- 商品详情：颜色规格、数量、加入购物袋、按地区展示配送说明
- 购物袋：改数量、删除、小计、满 $75 免运费、地区切换
- 模拟结算：只确认订单，不收集卡号
- 桌面与手机布局：手机底部有购物袋入口
- 刷新后购物袋和配送地区仍在
- 中英文：页头可切换；商品名、规格、地区与界面文案会一起切换；购物袋用稳定的规格 key，换语言不会丢项

## 验证

本地 `npm run build` 通过。界面需要在浏览器里再走一遍：切换中英文、搜索、筛选、详情加购、改数量、切换地区、模拟下单，以及窄屏宽度。

## 已知问题

- 商品图依赖 Unsplash，离线或被拦截时图片会空。
- 运费和关税是展示规则，不是真实物流计算。
- 直接打开生产环境的 `/product/...` 或 `/cart` 需要静态托管把所有路径回退到 `index.html`。仓库里的 `vercel.json` 已写好这条规则。

## 取舍

- 先保证找到商品、看规格、进购物袋这条路径，在两种屏幕下都能用。
- 结算只做到演示确认，不接支付。
- 样式全部用 Tailwind，自己排版，不用商城模板。
