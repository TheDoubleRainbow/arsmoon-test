<template>
  <div id="app">
    <div class="mainLayout">
      <instruments />
      <rates />
      <new-order-form />
    </div>
    <div class="bottomLayout">
      <order-history />
    </div>
  </div>
</template>

<script>
import 'bulma/css/bulma.css';

import Instruments from './components/Instruments.vue';
import NewOrderForm from './components/NewOrderForm.vue';
import OrderHistory from './components/OrderHistory.vue';
import Rates from './components/Rates.vue';

import socket from './socket';

export default {
  name: 'App',
  components: {
    Instruments,
    NewOrderForm,
    OrderHistory,
    Rates,
  },
  created() {
    socket.connect();
    this.$store.dispatch('getInstruments');
    this.$store.dispatch('getOrders');
    socket.send('{"op": "subscribe", "args": "instrument"}');
  },
};
</script>

<style>
body{
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  width: 1280px;
  margin: 0 auto;
}

.mainLayout {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.mainLayout > * {
  margin: 20px;
}
</style>
