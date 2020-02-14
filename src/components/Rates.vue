<template>
  <div class="rates">
    <table class="table is-bordered is-fullwidth">
      <tr>
        <th>Time</th>
        <th>Open</th>
        <th>High</th>
        <th>Low</th>
        <th>Close</th>
        <th>Gross value</th>
      </tr>
      <tr v-for="rate of rates" v-bind:key="rate.timestamp">
        <td>{{date(rate.timestamp)}}</td>
        <td>{{rate.open}}</td>
        <td>{{rate.high}}</td>
        <td>{{rate.low}}</td>
        <td>{{rate.close}}</td>
        <td>{{rate.volume}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import moment from 'moment';
import store from '../store/index';

export default {
  name: 'rates',
  methods: {
    date(timestamp) {
      const date = new Date(timestamp);
      return moment(date).format('hh:mm:ss');
    },
  },
  computed: {
    rates() {
      return store.state.rates;
    },
  },
};
</script>

<style scoped>
  .rates {
    width: 700px;
    max-height: 660px;
    overflow-y: scroll;
  }
</style>
