import process from 'node:process';
import {stocks} from 'stock-api';
import got from 'got';
// eslint-disable-next-line import/no-unassigned-import
import 'dotenv/config';

const ICON = 'https://gtimg.wechatpay.cn/resource/wxpay_oversea/2024-01-14/1705223028_1705223027981.png';
const GROUP = '股票详情';

function formatPercent(number) {
  return `${(number * 100).toFixed(2)}%`;
}

async function getStockInfo(stockId) {
  const {
    name,
    now,
    low,
    high,
    percent,
  } = await stocks.tencent.getStock(stockId);
  return {
    icon: ICON,
    group: GROUP,
    title: name,
    body: [
      `收盘价：${now}`,
      `涨跌幅：${formatPercent(percent)}`,
      `振幅：${formatPercent((high / low) - 1)}`,
    ].join('，'),
  };
}

const stockList = [
  'SH000001',
  'SH000300',
  'HK00700',
];

const BARK_KEY = process.env.BARK_KEY;
export default async function handler(request, response) {
  for (const stockId of stockList) {
    // eslint-disable-next-line no-await-in-loop
    const stockInfo = await getStockInfo(stockId);
    // eslint-disable-next-line no-await-in-loop
    await got.post(`https://api.day.app/${BARK_KEY}`, {json: stockInfo}).json();
  }

  response.status(200).json({
    body: '发送成功',
    query: request.query,
  });
}
