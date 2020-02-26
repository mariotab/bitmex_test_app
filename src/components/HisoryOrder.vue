<template>
  <div class="table-wrapper">
    <Loader v-if="loader"/>
    <table class="table table-dark trader-table table-order" v-else>
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Symbol</th>
          <th scope="col">Volume</th>
          <th scope="col">Date</th>
          <th scope="col">Side</th>
          <th scope="col">Price</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in history" :key="item.timestamp" class="instrument-table-row">
          <td scope="row">{{item.orderID}}</td>
          <td>{{item.symbol}}</td>
          <td>{{item.orderQty}}</td>
          <td>{{dateConvert(item.transactTime)}}</td>
          <td>{{item.side}}</td>
          <td>{{item.price}}</td>
          <td>{{item.ordStatus}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
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
      history: 'getHistoryOrder',
      loader: 'getLoaderHistoryOrder'
    })
  },
  methods: {
    ...mapActions(['fetchOrders'])
  },
  async created () {
    await this.fetchOrders()
  }
}
</script>

<style lang="scss" scoped>
  .table-order {
    margin-top: 0;
  }
</style>
