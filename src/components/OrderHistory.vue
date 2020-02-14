<template>
  <div class="orderHistory">
    <table class="table is-bordered is-fullwidth">
      <tr>
        <th>ID</th>
        <th>Symbol</th>
        <th>Order Qty</th>
        <th>Date</th>
        <th>Side</th>
        <th>Price</th>
        <th>Status</th>
      </tr>
      <tr v-for="order in orders" v-bind:key="order.orderID">
        <td>{{order.orderID}}</td>
        <td>{{order.symbol}}</td>
        <td>{{order.orderQty}}</td>
        <td>{{formatDate(order.timestamp)}}</td>
        <td>{{order.side}}</td>
        <td>{{order.price}}</td>
        <td>{{order.ordStatus}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import moment from 'moment';
import store from '../store/index';

export default {
  name: 'OrderHistory',
  methods: {
    formatDate(timestamp) {
      return moment(timestamp).format('L');
    },
  },
  computed: {
    orders() {
      return store.state.orders;
    },
  },
};
</script>

<style scoped>
  .orderHistory {
    display: flex;
    justify-content: center;
    padding: 0 20px;
    max-height: 250px;
    overflow-y: scroll;
  }
</style>
