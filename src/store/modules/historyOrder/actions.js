import crypto from 'crypto'
import { axios } from '../../../bitmexService/bitmexApi'

export async function fetchOrders (context) {
  context.commit('setLoadingHistoryOrder', true)
  const verb = 'GET'
  const expires = Math.round(new Date().getTime() / 1000) + 60
  const path = '/api/v1/order?reverse=true&count=100'
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
    context.commit('setHistoryOrder', res.data)
    context.commit('setLoadingHistoryOrder', false)
  } catch (e) {
    context.commit('setLoadingHistoryOrder', false)
    context.commit('setErrorLoadingHistoryOrder', e)
    console.log(e.message)
  }
} // <--- this f-on fetching data(synbol, lastPrice) needed activeInstrument component
