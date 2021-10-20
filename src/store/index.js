import { createStore } from 'vuex';
import { randomNumber } from '@/utils';

export default createStore({
  state: {
    user: {
      hero: {},
      monsters: [],
      items: [],
      money: 300
    },
    game: {
      map: {},
      positions: [],
      position: 0,
      dice: 0,
      monsters: [],
      items: [],
      gift: {}
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
      isGifting: false,
      isStarted: false,
      isOn: true,
      isUsingItem: false
    }
  },
  mutations: {
    addHero(state, payload) {
      state.user.hero = { ...payload };
    },
    removeHero(state) {
      state.user.hero = {};
    },
    addMonsters(state, payload) {
      state.user.monsters.push({ ...payload });
    },
    removeMonster(state, payload) {
      state.user.monsters.splice(payload, 1);
    },
    addItem(state, payload) {
      state.user.items.push({ ...payload });
    },
    removeItem(state, payload) {
      state.user.items.splice(payload, 1);
    },
    addMap(state, payload) {
      state.game.map = {};
      state.game.positions = [];

      state.game.map = { ...payload };

      let ar = ['._.', 'FIGHT', '._.', 'FIGHT', 'GIFT', 'GIFT', 'TRAP'];
      for (let i = 0; i < payload.size; i++) {
        state.game.positions.push(ar[Math.floor(Math.random() * ar.length)]);
      }
      state.game.positions[0] = 'START';
      state.game.positions[state.game.positions.length - 1] = 'BOSS';
    },
    removeMap(state) {
      state.game.map = {};
      state.game.position = 0;
      state.game.positions = [];
    },
    buyItem(state, payload) {
      let money = state.user.money;
      if (money < 1) {
        alert('Dinheiro insuficiente.');
      } else {
        let price = payload.price;
        if (money > price) {
          state.user.items.push({ ...payload });
          state.user.money -= price;
        } else {
          alert('Saldo insuficiente');
        }
      }
    },
    giftItem(state, payload) {
      console.log(payload);
      state.user.items.push({ ...payload });
      state.game.gift = { ...payload };
    },
    closeGiftModal(state) {
      state.status.isGifting = false;
    },
    loadMonsters(state, payload) {
      state.game.monsters = payload.monsters;
    },
    loadShopItems(state, payload) {
      state.game.items = payload.items;
    },
    getPosition(state, payload) {
      state.game.position += payload;
      if (state.game.positions.length < state.game.position) {
        alert('END');
      }
      // CHECK POSITION:
      let pos = state.game.positions[state.game.position];

      if (pos === 'FIGHT') {
        // fight.............
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
        // gift............
        state.status.isGifting = true;
        let y = randomNumber(state.game.items.length, 1);
        state.game.gift = { ...state.game.items[y - 1] };
        state.user.items.push({ ...state.game.items[y - 1] });
      } else if (pos === 'TRAP') {
        let w = randomNumber(30, 5);
        state.user.hero.hp -= w;
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
    },
    restartGame(state) {
      state.game.gift = {};
      state.game.map = {};
      state.game.position = 0;
      state.game.positions = [];
      state.user.hero = {};
      state.user.monsters = [];
      state.user.items = [];
      state.user.money = 300;
      state.status.isFighting = false;
      state.fight.hero.monster = {};
      state.fight.enemy.monster = {};
    }
  }
});
