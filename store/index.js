import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

const createStore = () => {
  return new Vuex.Store({
    state: function () {
      return {
        message: "Store counter number",
        counter: 0,
      };
    },
    mutations: {
      count: function (state, n) {
        // state.message = obj.message;
        // state.counter += obj.add;
        state.counter += n;
      },
      say: function (state, msg) {
        state.message = msg;
      },
      reset: function (state) {
        state.counter = 0;
        state.message = "reset now...";
      },
    },
    actions: {
      doit: function (context) {
        const n = Math.floor(Math.random() * 10);
        context.commit("count", n);
        context.commit("say", "add " + n + "!");
      },
    },
    plugins: [createPersistedState()],
  });
};

export default createStore;
