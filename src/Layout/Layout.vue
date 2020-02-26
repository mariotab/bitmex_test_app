<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-3">
        <ActiveInstrument/>
      </div>
      <div class="col-lg-6 history-trader-wrapper">
        <HistoryTrading />
      </div>
      <div class="col-lg-3 history-trader-wrapper">
        <Orders />
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <HistoryOrder />
      </div>
    </div>
  </div>
</template>

<script>
import ActiveInstrument from '../components/ActiveInstrument'
import HistoryTrading from '../components/HistoryTrading'
import Orders from '../components/Orders'
export default {
  components: {
    ActiveInstrument,
    HistoryTrading,
    Orders,
    HistoryOrder: () => import('../components/HisoryOrder') // <--- we don't need use dinamic import in this line, but for demonstration we can use this ;)
  }
}
</script>

<style lang="scss" scoped>
  .history-trader-wrapper {
    padding-left: 0;
  }
</style>
