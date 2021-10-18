import { createStore } from 'vuex';

export default createStore({
  state: {
    user: {
      hero: {},
      monsters: [],
      items: []
    },
    game: {
      map: {},
      positions: [],
      position: 0,
      dice: 0
    },
    fight: {
      hero: {
        monster: {}, // ref to user.monsters[x]
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
    },
    reset: {}
  },
  mutations: {
    addHero(state, payload) {
      state.user.hero = { ...payload };
    },
    addMonsters(state, payload) {
      state.user.monsters.push({ ...payload });
    },
    addMap(state, payload) {
      state.game.map = {};
      state.game.positions = [];

      state.game.map = { ...payload };

      let ar = [
        '._._._._.',
        '._._._._.',
        'FIGHT',
        'FIGHT',
        'FIGHT',
        'GIFT',
        'TRAP'
      ];
      for (let i = 0; i < payload.size; i++) {
        state.game.positions.push(ar[Math.floor(Math.random() * ar.length)]);
      }
      state.game.positions[0] = 'START';
      state.game.positions[state.game.positions.length - 1] = 'BOSS';
    },
    randomNumber(state, payload) {
      state.game.dice = Math.floor(Math.random() * payload.max + payload.min);
    },
    getPosition(state, payload) {
      state.game.position += payload;
      if (state.game.positions.length < state.game.position) {
        alert('END');
      }
      // CHECK POSITION:

      // this.checkPosition();

      // if (this.checkPosition() === 'fight') {
      //   this.isFigthing = true;

      //   // get random monster
      //   this.enemyMonsterFight = this.getRandomEnemy();
      // } else if (this.checkPosition() === 'gift') {
      //   // TODO: gift
      // } else if (this.checkPosition() === 'boss') {
      //   // TODO: boss
      // }
    }
  }
});
