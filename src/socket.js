import store from './store/index';

export default {
  connection: null,

  oldInstrument: '',
  currentInstrument: '',
  connect() {
    this.connection = new WebSocket(process.env.VUE_APP_SOCKET);
    this.connection.onmessage = this.onMessage.bind(this);

    store.subscribeAction((action, state) => {
      if (action.type === 'getRates') {
        this.currentInstrument = state.selectedInstrument;
        this.send(`{"op": "subscribe", "args": "tradeBin1m:${this.currentInstrument}"}`);

        if (this.oldInstrument) {
          this.send(`{"op": "unsubscribe", "args": "tradeBin1m:${this.oldInstrument}"}`);
        }
        this.oldInstrument = this.currentInstrument;
      }
    });
  },

  send(data) {
    if (!this.connection.readyState) {
      setTimeout(() => {
        this.send(data);
      }, 100);
    } else {
      this.connection.send(data);
    }
  },

  checkInstrument(data) {
    const instrument = data[0];
    if (store.state.activeInstrumentsList.includes(instrument.symbol) && instrument.lastPrice) {
      store.commit('updateInstrument', instrument);
    }
  },

  onMessage(message) {
    const data = JSON.parse(message.data);
    if (data.table === 'instrument' && data.action === 'update') {
      this.checkInstrument(data.data);
    } else if (data.table === 'tradeBin1m' && data.action === 'insert'
              && data.data[0].symbol === store.state.selectedInstrument) {
      store.commit('insertRate', data.data);
    }
  },
};
