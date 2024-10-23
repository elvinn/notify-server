import esMain from 'es-main'
import { stocks } from 'stock-api'
import 'dotenv/config'
import { checkProcessEnv, formatPercent, notify } from '../util/index.js'

const ICON = 'https://gtimg.wechatpay.cn/resource/wxpay_oversea/2024-01-14/1705223028_1705223027981.png'
const GROUP = '股票详情'

// 需要关注的股票列表
const stockList = [
  'SH000001', // 上证指数
  'HK00700' // 腾讯
]

checkProcessEnv()

/**
 * 获取股票信息
 * @param {string} stockId 股票代码
 */
async function getStockInfo (stockId) {
  const {
    name,
    now,
    low,
    high,
    percent
  } = await stocks.tencent.getStock(stockId)
  return {
    icon: ICON,
    group: GROUP,
    title: name,
    body: [
      `收盘价：${now}`,
      `涨跌幅：${formatPercent(percent)}`,
      `振幅：${formatPercent((high / low) - 1)}`
    ].join('，')
  }
}

export default async function notifyStock () {
  for (const stockId of stockList) {
    const stockInfo = await getStockInfo(stockId)
    await notify(stockInfo)
  }
}

if (esMain(import.meta)) {
  await notifyStock()
}
