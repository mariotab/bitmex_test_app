<template>
  <div class="table-wrapper">
    <Loader v-if="loader"/>
    <table class="table table-dark trader-table" v-else>
      <thead>
        <tr>
          <th scope="col">Time</th>
          <th scope="col">Open</th>
          <th scope="col">Close</th>
          <th scope="col">Max</th>
          <th scope="col">Min</th>
          <th scope="col">Volume</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in history" :key="item.timestamp" class="instrument-table-row">
          <td scope="row">{{newData(item.timestamp)}}</td>
          <td>{{item.open}}</td>
          <td>{{item.close}}</td>
          <td>{{item.high}}</td>
          <td>{{item.low}}</td>
          <td>{{item.volume}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { newWebSocket } from '../bitmexService/bitmexApi'
import { mapActions, mapGetters } from 'vuex'
import Loader from './Loader'
export default {
  components: {
    Loader
  },
  data: () => ({
    ws: null
  }),
  computed: {
    ...mapGetters({
      history: 'getHistory',
      loader: 'getLoaderHistory',
      symbol: 'getSymbol'
    })
  },
  watch: {
    async symbol () {
      await this.fetchHistory(this.symbol)
      this.history.splice(15)
    }
  },
  methods: {
    ...mapActions(['fetchHistory']),
    newData (date) {
      const myDate = new Date(date)
      return `${myDate.getFullYear()}-${myDate.getMonth() < 10 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1}-${myDate.getDate()} ${myDate.getHours()}:${myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes()}`
    }
  },
  async created () {
    await this.fetchHistory()
    this.history.splice(15)
    // ----- START SOCKET CODE ------
    this.ws = newWebSocket()
    this.ws.onopen = () => {
      this.ws.send(
        JSON.stringify({
          op: 'subscribe',
          args: `tradeBin1m:${this.symbol}`
        })
      )
      console.log('WS подключенно')
    }
    this.ws.onclose = function (eventclose) {
      console.log('соеденение закрыто причина: ' + this.eventclose)
    }
    this.ws.onmessage = evt => {
      const message = JSON.parse(evt.data)
      if (message.data && this.history[0].timestamp !== message.data[0].timestamp) {
        this.history.unshift(message.data[0])
        this.history.splice(15)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
