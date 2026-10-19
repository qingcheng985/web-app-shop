# Northline

这是一个给「50 分钟内能讲清楚」准备的前端演示店：海外旅行向选购站，英文为主、中文为辅。你打开就能逛，不用起后端。

## 你演示时走哪条线

别铺开讲评价、推荐、账号。就走这条主路径就够了：

1. **找到商品** — 首页搜一下、筛分类/价格，点进详情  
2. **看规格** — 选颜色、改数量  
3. **进购物袋** — 改数量、换配送地区，看运费怎么变  
4. **演示确认** — 点「提交演示订单」，证明流程走完了；**不接支付 SDK**，也不收卡号

购物袋、配送地区、语言都存在浏览器 `localStorage` 里，刷新不会丢。换语言时规格用的是稳定 key（比如 `Sand`），购物车不会因为文案变了就对不上。

## 为什么这么砍

| 我们做了 | 我们故意没做 |
| --- | --- |
| 静态商品 + 本地购物车 | 评价、推荐、登录注册 |
| 满 $75 免运费的展示规则 | 真物流 / 关税计算 |
| 中英文界面 | 支付、订单后台 |
| Tailwind 自己排的编辑向旅行风 | 套现成商城模板 |

全前端静态数据，就是为了：装依赖、跑起来、录屏或现场点一遍，都还来得及。文案维护成本会高一点（每种语言一份），但换语言不影响购物车一致性，演示时更稳。

## 怎么在本机跑

```bash
npm install
npm run dev
```

浏览器打开 `http://localhost:8888`。要看生产包：

```bash
npm run build
npm run preview
```

## 时间紧怎么交差

**本地演示 + 录屏就够交差。** 按上面主路径点一遍，中英文各切一次，窄屏看一下手机底栏购物袋入口。

线上部署是加分项：源码和构建已经就绪。有空再发；没空就 README 留着，别人（或你自己）按下面一键发也行。

## 想部署到 Vercel（加分）

1. 打开 [vercel.com](https://vercel.com)，用 GitHub 登录  
2. Import 这个仓库  
3. 默认就行：Framework = Vite，Build = `npm run build`，Output = `dist`  
4. Deploy  

根目录有 `vercel.json`，已经写好 SPA 回退，直接打开 `/product/...` 或 `/cart` 刷新也不会 404。

## 技术栈（给同学看的）

- React 19 + Vite + TypeScript  
- React Router  
- Tailwind CSS v4（`@tailwindcss/vite`）  
- i18next（`src/i18n/en.ts` / `zh.ts`）  
- Context + `useReducer` 管购物袋；`localStorage` 持久化  
- 商品在 `src/data/catalog.ts`，图用 Unsplash

## 已知坑

- 没网或 Unsplash 被拦时，商品图会空  
- 运费、关税只是演示文案，不是真实报价  
- 若换成别的静态托管，记得所有路径都回退到 `index.html`（Vercel 已经配好了）
