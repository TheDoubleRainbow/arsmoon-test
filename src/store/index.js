import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    rates: [],
    instruments: [],
    orders: {},
    history: [],
    activeInstrumentsList: [],
    selectedInstrument: '',
  },
  mutations: {
    updateInstruments(state, value) {
      state.instruments = value;
      state.activeInstrumentsList = value.map((instrument) => instrument.symbol);
    },

    updateInstrument(state, value) {
      for (let i = 0; i < state.instruments.length; i += 1) {
        let instrument = state.instruments[i];
        if (instrument.symbol === value.symbol) {
          instrument = {
            ...instrument,
            ...value,
          };
        }
        state.instruments[i] = instrument;
      }
      state.instruments = [...state.instruments];
    },

    updateRates(state, value) {
      state.rates = value;
    },

    updateSelectedInstrument(state, value) {
      state.selectedInstrument = value;
    },

    insertRate(state, value) {
      state.rates = [...value, ...state.rates];
    },

    updateOrders(state, value) {
      state.orders = value;
    },
  },
  actions: {
    getInstruments({ commit }) {
      fetch('instrument/active', {
        headers: api.getHeaders('/api/v1/instrument/active'),
        method: 'GET',
      }).then(async (response) => {
        response.json().then((respData) => {
          commit('updateInstruments', respData);
          commit('updateSelectedInstrument', respData[0].symbol);
          this.dispatch('getRates');
        });
      });
    },

    getRates({ commit, state }) {
      fetch(`trade/bucketed?binSize=1m&partial=false&count=100&reverse=true&symbol=${state.selectedInstrument}`, {
        headers: api.getHeaders(`/api/v1/trade/bucketed?binSize=1m&partial=false&count=100&reverse=true&symbol=${state.selectedInstrument}`),
        method: 'GET',
      }).then(async (response) => {
        response.json().then((respData) => {
          commit('updateRates', respData);
        });
      });
    },

    selectInstrument({ commit }, instrument) {
      commit('updateSelectedInstrument', instrument);
      this.dispatch('getRates');
    },

    getOrders({ commit }) {
      fetch('order', {
        headers: api.getHeaders('/api/v1/order'),
        method: 'GET',
      }).then(async (response) => {
        response.json().then((respData) => {
          commit('updateOrders', respData);
        });
      });
    },
  },
  modules: {
  },
});
