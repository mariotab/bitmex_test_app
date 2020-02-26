<template>
  <div class="table-wrapper order-wrapper">
    <Loader v-if="loader"/>
    <form @submit.prevent="submitForm" v-else>
      <p class="order-header" v-if="selectSymbol">Create your order</p>
      <p class="order-header" v-else>Select instrument</p>
      <fieldset :disabled="!selectSymbol">
        <div class="form-group">
          <label for="volume" class="input-label">Enter volume </label>
          <input
            id="volume"
            type="text"
            class="form-control order-input"
            v-model="volume"
          />
        </div>
        <div class="form-group">
          <button
            type="submit"
            @click="buy = true"
            class="btn btn-primary order-btn"
          >Buy</button>
          <button
            type="submit"
            @click="buy = false"
            class="btn btn-primary order-btn"
          >Sell</button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Loader from './Loader'
export default {
  components: {
    Loader
  },
  data: () => ({
    volume: 1,
    selectSymbol: false,
    buy: true
  }),
  computed: {
    ...mapGetters({
      symbol: 'getSymbol',
      loader: 'getCreateRequest',
      error: 'getErrorNewOrder'
    })
  },
  watch: {
    symbol () {
      this.selectSymbol = true
    }
  },
  methods: {
    ...mapActions(['fetchNewOrder2']),
    async submitForm () {
      const side = this.buy ? 'Buy' : 'Sell'
      await this.fetchNewOrder2({
        ordType: 'Market',
        symbol: this.symbol,
        orderQty: this.volume,
        side
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .order-wrapper {
    margin-top: 12px;
    border-radius: 12px;
    background-color: #343a40;
  }
  .order-header {
    text-align: center;
    color: #fff;
    font-weight: 600;
    font-size: 1.2rem;
    margin: 10px 0 0 0;
  }
  .input-label {
    color: #fff;
    text-align: center;
    width: 100%;
    margin-bottom: 0;
  }
  .order-input {
    margin: 2px 10px 10px 10px;
    width: calc( 100% - 20px );
  }
  .order-btn {
    width: calc( 50% - 15px);
    margin: 0 10px 0 10px;
    &:first-child {
      margin-right: 0;
    }
  }
</style>
