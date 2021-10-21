import { createStore } from 'vuex';
import { randomNumber } from '@/utils';

export default createStore({
  state: {
    user: {
      hero: {},
      monsters: [],
      items: [],
      money: 500
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
        monster: {},
        monsterIndex: null,
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
      isSelectingMonster: false,
      isBuying: false,
      isGifting: false,
      isStarted: false,
      isOn: true,
      isUsingItem: false,
      isOver: false
    }
  },
  getters: {
    isOver(state) {
      return state.status.isOver;
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

      let ar = ['._.', 'FIGHT', 'FIGHT', 'FIGHT', 'FIGHT', 'GIFT', 'TRAP'];
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
    useItem(state, payload) {
      if (payload.item.type === 'health') {
        state.fight.hero.monster.hp += parseInt(payload.item.value);
        state.user.items.splice(payload.i, 1);
      } else if (payload.item.type === 'mana') {
        state.fight.hero.monster.mp += parseInt(payload.item.value);
        state.user.items.splice(payload.i, 1);
      } else if (payload.item.type === 'bomb') {
        state.fight.enemy.monster.hp -= parseInt(payload.item.value);
        state.user.items.splice(payload.i, 1);
      }
    },
    giftItem(state, payload) {
      state.user.items.push({ ...payload });
      state.game.gift = { ...payload };
    },
    closeGiftModal(state) {
      state.status.isGifting = false;
    },
    closeSelectMonsterModal(state) {
      state.status.isSelectingMonster = false;
    },
    loadMonsters(state, payload) {
      state.game.monsters = payload.monsters;
    },
    selectMonster(state, payload) {
      if (state.user.monsters.length === 0) {
        alert('Você não possui mais monstros....');
      }
      state.fight.hero.monster = state.user.monsters[payload.i];
      state.fight.hero.monsterIndex = payload.i;
      state.status.isFighting = true;
      state.status.isSelectingMonster = false;
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
        state.status.isSelectingMonster = true;

        if (state.user.monsters.length === 0) {
          alert('Você não possui mais monstros.');
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
        // fake damage
        let w = randomNumber(30, 5);
        state.user.hero.hp -= w;
      } else if (pos === 'BOSS') {
        console.log('Boss...');
      }
    },
    damage(state, payload) {
      if (payload.at === 'enemy') {
        state.fight.enemy.monster.hp -= payload.damage;
        // fake damage
        state.fight.hero.monster.hp -= 33;

        // Check enemy monster
        if (state.fight.enemy.monster.hp < 1) {
          state.status.isFighting = false;
          state.fight.enemy.monster = {};
        }
        // Check hero monster
        if (state.fight.hero.monster.hp < 1) {
          // pop
          state.user.monsters.splice(state.fight.hero.monsterIndex, 1);
          state.fight.hero.monsterIndex = null;

          // selecionar outro monstro se houver
          if (state.user.monsters.length === 0) {
            state.status.isOver = true;
            alert('GAME OVER');
          }
          state.status.isFighting = false;
          state.fight.hero.monster = {};
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
      state.user.money = 500;
      state.status.isFighting = false;
      state.fight.hero.monster = {};
      state.fight.enemy.monster = {};
      state.status.isOver = false;
    }
  }
});
