import { createStore } from 'vuex';
import { randomNumber } from '@/utils';

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
      dice: 0,
      monsters: []
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

      let ar = ['._.', '._.', 'FIGHT', 'FIGHT', 'FIGHT', 'GIFT', 'TRAP'];
      for (let i = 0; i < payload.size; i++) {
        state.game.positions.push(ar[Math.floor(Math.random() * ar.length)]);
      }
      state.game.positions[0] = 'START';
      state.game.positions[state.game.positions.length - 1] = 'BOSS';
    },
    loadMonsters(state, payload) {
      state.game.monsters = payload.monsters;
    },
    // TODO: remove
    randomNumber(state, payload) {
      state.game.dice = Math.floor(Math.random() * payload.max + payload.min);
    },
    getPosition(state, payload) {
      state.game.position += payload;
      if (state.game.positions.length < state.game.position) {
        alert('END');
      }
      // CHECK POSITION:
      let pos = state.game.positions[state.game.position];

      if (pos === 'FIGHT') {
        console.log('Lutando...');

        state.status.isFighting = true;

        if (state.user.monsters[0]) {
          state.fight.hero.monster = state.user.monsters[0];
        } else {
          alert('sem monstros');
        }

        // seleciona um monstro aleatório
        let x = randomNumber(state.game.monsters.length, 1);
        state.fight.enemy.monster = { ...state.game.monsters[x - 1] };
      } else if (pos === 'GIFT') {
        console.log('gift...');
      } else if (pos === 'TRAP') {
        console.log('trap...');
      } else if (pos === 'BOSS') {
        console.log('Boss...');
      }
    },
    damage(state, payload) {
      // fake damage
      state.fight.hero.monster.hp -= 30;

      if (payload.at === 'enemy') {
        state.fight.enemy.monster.hp -= payload.damage;
        if (state.fight.enemy.monster.hp < 0) {
          state.status.isFighting = false;
          console.log('end fight');
        }
      }
    }
  }
});
