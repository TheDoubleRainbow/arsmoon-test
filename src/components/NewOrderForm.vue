<template>
  <div class="new-order">
    <input type="text" value="1" v-model="qty" placeholder="volume" class="input">
    <div class="buttons">
      <button :disabled="qty <= 0" @click="placeOrder('Buy')" class="button">Buy</button>
      <button :disabled="qty <= 0" @click="placeOrder('Sell')" class="button">Sell</button>
    </div>
    <div v-if="error" class="notification is-danger">
      {{error}}
    </div>
    <div v-else-if="success" class="notification is-success">
      Order placed!
    </div>
  </div>
</template>

<script>
import store from '../store/index';
import api from '../api';

export default {
  name: 'NewOrderForm',

  data() {
    return {
      qty: 1,
      error: '',
      success: false,
    };
  },
  methods: {
    placeOrder(side) {
      if (this.qty > 0) {
        const data = JSON.stringify({
          ordType: 'Market',
          symbol: store.state.selectedInstrument,
          orderQty: this.qty,
          side,
        });
        fetch('order', {
          headers: api.getHeaders('/api/v1/order', 'POST', data),
          method: 'POST',
          body: data,
        }).then(async (response) => {
          response.json().then((respData) => {
            if (respData.error) {
              this.error = respData.error.message;
            } else {
              this.error = '';
              this.success = true;
              store.dispatch('getOrders');
            }
          });
        });
      }
    },
  },
};
</script>

<style scoped>

  .new-order {
    width: 250px;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  .button {
    width: 40%;
  }
</style>
