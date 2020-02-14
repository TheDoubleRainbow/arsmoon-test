<template>
  <div class="instruments">
    <table class="table is-bordered">
      <tr>
        <th>Pair</th>
        <th>Value</th>
      </tr>
      <tr class="instrument" v-bind:class="getSelectedClass(instrument.symbol)"
          v-for="instrument in instruments" v-bind:key="instrument.symbol"
          @click = "select(instrument.symbol)">
        <td>{{instrument.symbol}}</td>
        <td>{{instrument.lastPrice}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import store from '../store/index';

export default {
  name: 'Instruments',
  methods: {
    select(instrument) {
      store.dispatch('selectInstrument', instrument);
    },
    getSelectedClass(instrument) {
      return instrument === this.selected ? 'selected' : '';
    },
  },
  computed: {
    instruments() {
      return store.state.instruments;
    },

    selected() {
      return store.state.selectedInstrument;
    },
  },
};
</script>

<style scoped>
  .instruments {
    width: 200px;
  }
  .instrument {
    cursor: pointer;
  }

  .instrument.selected {
    font-weight: bold;
    border-left: 2px solid black;
  }
</style>
