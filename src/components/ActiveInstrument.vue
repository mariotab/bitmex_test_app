<template>
  <div class="table-wrapper">
    <Loader v-if="loader"/>
    <table class="table table-hover table-dark trader-table" v-else>
      <thead>
        <tr>
          <th scope="col">Symbol</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in symbols" :key="item.symbol" class="instrument-table-row" @click="setSymbol(item.symbol)">
          <th scope="row">{{item.symbol}}</th>
          <td>{{item.lastPrice}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// import { newWebSocket } from '../bitmexService/bitmexApi'
import { mapMutations, mapActions, mapGetters } from 'vuex'
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
      symbols: 'getSymbols',
      loader: 'getLoaderSymbols'
    })
  },
  methods: {
    ...mapMutations(['setSymbol']),
    ...mapActions(['fetchSymbols']),
    updateSymbolPrice (symbol, price) {
      this.symbols.forEach(element => {
        if (element.symbol === symbol) element.lastPrice = price
      })
    }
  },
  async created () {
    await this.fetchSymbols()
    // ----- START SOCKET CODE ------
    /* this.ws = newWebSocket()
    this.ws.onopen = () => {
      this.ws.send(
        JSON.stringify({
          op: 'subscribe',
          args: 'instrument'
        })
      )
      console.log('WS подключенно')
    }
    this.ws.onclose = function (eventclose) {
      console.log('соеденение закрыто причина: ' + this.eventclose)
    }
    this.ws.onmessage = evt => {
      const message = JSON.parse(evt.data)
      if (message.data && message.data[0].lastPrice) this.updateSymbolPrice(message.data[0].symbol, message.data[0].lastPrice)
    } */
  }
}
</script>

<style lang="scss" scoped>
  .instrument-table-row:hover {
    cursor: pointer;
  }
</style>
