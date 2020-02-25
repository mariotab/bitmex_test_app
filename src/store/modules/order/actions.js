import crypto from 'crypto'
import { axios } from '../../../bitmexService/bitmexApi'
import request from 'request'

export async function fetchNewOrder (context, payload) {
  context.commit('setRequest', true)
  const verb = 'POST'
  const expires = Math.round(new Date().getTime() / 1000) + 60
  const path = '/api/v1/order'
  const data = {
    symbol: 'XBTUSD',
    orderQty: 1,
    price: 10000,
    ordType: 'Limit'
  }
  const postBody = JSON.stringify(data)
  const apiSecret = '-hoVHM9kC1JRwlQBPjYdzosCCpKl7CNtomzyCTGVoLcQ5PSV'
  console.log(postBody)
  const signature = crypto
    .createHmac('sha256', apiSecret)
    .update(verb + path + expires + postBody)
    .digest('hex')
  try {
    const res = await axios(`${path}`, {
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
        'X-requested-with': 'XMLHttpRequest',
        'api-expires': expires,
        'api-key': '48GphC_MTWN_0ntW4V1osU4S',
        'api-signature': signature
      },
      method: verb,
      body: postBody
    })
    console.log(res)
    context.commit('setNewOrder', res.data)
    context.commit('setRequest', false)
  } catch (e) {
    context.commit('setRequest', false)
    context.commit('setErrorRequest', e)
    console.log(e.message)
  }
}

export function fetchNewOrder2 (context, payload) {
  context.commit('setRequest', true)
  const verb = 'POST'
  const expires = Math.round(new Date().getTime() / 1000) + 60
  const path = '/api/v1/order'
  const apiSecret = '-hoVHM9kC1JRwlQBPjYdzosCCpKl7CNtomzyCTGVoLcQ5PSV'
  const apiKey = '48GphC_MTWN_0ntW4V1osU4S'
  const postBody = JSON.stringify(payload)

  const signature = crypto.createHmac('sha256', apiSecret).update(verb + path + expires + postBody).digest('hex')

  const headers = {
    'content-type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'api-expires': expires,
    'api-key': apiKey,
    'api-signature': signature
  }

  const requestOptions = {
    headers: headers,
    url: 'http://localhost:8081/https://testnet.bitmex.com' + path,
    method: verb,
    body: postBody
  }

  request(requestOptions, function (error, response, body) {
    if (error) { console.log(error) }
    console.log(body)
  })
  context.commit('setRequest', false)
}
