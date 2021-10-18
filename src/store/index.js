import { createStore } from 'vuex';

export default createStore({
  state: {
    user: {
      hero: {},
      monsters: [],
      items: []
    },
    game: {
      map: [],
      position: 0
    },
    fight: {
      hero: {
        monster: {}, // ref
        damageMax: 0,
        damageMin: 0,
        win: false
      },
      enemy: {
        monster: {},
        damageMax: 0,
        damageMin: 0
      }
    },
    status: {
      isFighting: false,
      isBuying: false,
      isStarted: false,
      isOn: true,
      isUsingItem: false
    }
  },
  mutations: {
    addHero(state, payload) {
      console.log('add hero');
      state.user.hero = { ...payload };
    },
    addMonsters(state, payload) {
      console.log('add monsters');
      state.user.monsters.push({ ...payload });
    },
    addMap(state, payload) {
      console.log('add map');
      state.game.map = { ...payload };
    }
  }
});
