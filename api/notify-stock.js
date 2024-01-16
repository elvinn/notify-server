import notifyStock from '../src/notify-stock.js'

export default async function handler (request, response) {
  await notifyStock()
  response.status(200).json({
    body: '执行成功'
  })
}
