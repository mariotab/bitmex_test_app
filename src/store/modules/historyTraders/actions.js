import crypto from 'crypto'
import { axios } from '../../../bitmexService/bitmexApi'

export async function fetchHistory (context, symbol = 'XBTUSD') {
  context.commit('setLoadigHistory', true)
  const verb = 'GET'
  const expires = Math.round(new Date().getTime() / 1000) + 60
  const path = `/api/v1/trade/bucketed?binSize=1m&partial=false&count=100&reverse=true&symbol=${symbol}`
  const postBody = ''
  const apiSecret = '-hoVHM9kC1JRwlQBPjYdzosCCpKl7CNtomzyCTGVoLcQ5PSV'

  const signature = crypto
    .createHmac('sha256', apiSecret)
    .update(verb + path + expires + postBody)
    .digest('hex')
  try {
    const res = await axios(`${path}`, {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        'x-requested-with': 'XMLHttpRequest',
        'api-expires': expires,
        'api-key': '48GphC_MTWN_0ntW4V1osU4S',
        'api-signature': signature
      },
      method: verb,
      body: postBody
    })
    context.commit('setHistory', res.data)
    context.commit('setLoadigHistory', false)
  } catch (e) {
    context.commit('setLoadigHistory', false)
    context.commit('setErrorLoadigHistory', e)
  }
}
