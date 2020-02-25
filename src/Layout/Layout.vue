<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-3">
        <ActiveInstrument />
      </div>
      <div class="col-lg-6 history-trader-wrapper">
        <HistoryTrading />
      </div>
    </div>
  </div>
</template>

<script>
import ActiveInstrument from '../components/ActiveInstrument'
import HistoryTrading from '../components/HistoryTrading'
export default {
  components: {
    ActiveInstrument,
    HistoryTrading
  }
}
</script>

<style lang="scss" scoped>
  .history-trader-wrapper {
    padding-left: 0;
  }
</style>
