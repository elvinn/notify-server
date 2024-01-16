import process from 'node:process'
import got from 'got'

/**
 * 将数字格式化为百分比
 * 例如 ：formatPercent(0.5) => 50.00%
 * @param {number} number 数字
 * @returns {string}
 */
function formatPercent (number) {
  return `${(number * 100).toFixed(2)}%`
}

/**
 * 检查环境变量是否配置
 * 若未配置则抛出错误
 */
function checkProcessEnv () {
  const processEnv = process.env
  const requiredEnvs = ['BARK_KEY']
  for (const env of requiredEnvs) {
    if (processEnv[env] === undefined) {
      throw new Error(`process.env.${env} is undefined`)
    }

    if (processEnv[env] === '') {
      throw new Error(`process.env.${env} is empty string`)
    }
  }
}

/**
 * 发送提醒
 * @param {object} message 提醒内容
 * @param {string} key 推送密钥
 */
function notify (message, key = process.env.BARK_KEY) {
  return got.post(`https://api.day.app/${key}`, { json: message }).json()
}

export {
  formatPercent,
  checkProcessEnv,
  notify
}
