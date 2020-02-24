import Axios from 'axios'

export const axios = Axios.create({
  baseURL: 'http://localhost:8081/https://testnet.bitmex.com'
})

export const newWebSocket = () => {
  return new WebSocket('wss://testnet.bitmex.com/realtime')
}
