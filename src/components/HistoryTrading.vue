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
      <transition-group name="flip-list" tag="tbody">
        <tr v-for="item in history" :key="item.timestamp" class="instrument-table-row">
          <td scope="row">{{dateConvert(item.timestamp)}}</td>
          <td>{{item.open}}</td>
          <td>{{item.close}}</td>
          <td>{{item.high}}</td>
          <td>{{item.low}}</td>
          <td>{{item.volume}}</td>
        </tr>
       </transition-group>
    </table>
  </div>
</template>

<script>
import { newWebSocket } from '../bitmexService/bitmexApi'
import { mapActions, mapGetters } from 'vuex'
import Loader from './Loader'
import { dateConvert } from '../mixins/dateConvert'
export default {
  components: {
    Loader
  },
  mixins: [dateConvert],
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
    ...mapActions(['fetchHistory'])
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
      console.log('WS history trading подключенно')
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
  .flip-list-move {
    transition: transform 2s;
  }
</style>
