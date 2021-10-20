<template>
  <button class="button" @click="addCount">click</button>
  {{ total }}
  <div v-if="e1 || e2 || e3">
    {{ e1 }}
    {{ e2 }}
    {{ e3 }}
  </div>

  <h1>Game</h1>
  <button class="button is-primary" @click="isOn = !isOn">
    <span class="icon"><i class="fas fa-play"></i></span>
    <span>Novo Jogo</span>
  </button>
  <div v-if="isOn">
    <hr />

    <SelectHero :heroes="heroes" @selectMyHero="selectHero" />
    {{ myHero }}

    <hr />

    <SelectMonsters
      :monsters="monsters"
      @selectMyMonster="selectMonster"
      @resetMyMonsters="myMonsters = []"
      :limit="myMonsters.length"
    />
    {{ myMonsters }}

    <hr />

    <SelectMap :maps="maps" @selectMyMap="selectMap" />

    {{ myMap }}

    <hr />

    <button class="button is-primary" @click="start">
      <span class="icon"><i class="fas fa-play"></i></span>
      <span>START</span>
    </button>

    <button class="button is-dark" @click="restart">
      <span class="icon"><i class="fas fa-power-off"></i></span>
      <span>Restart</span>
    </button>

    <button class="button is-danger">
      <span class="icon"><i class="fas fa-power-off"></i></span>
      <span>Sair</span>
    </button>
    <hr />
    <div v-show="isStarted">
      <button
        class="button is-primary"
        @click="getPostion(dice())"
        :disabled="isFigthing"
      >
        <span class="icon"><i class="fas fa-dice-six"></i></span>
        <span>Jogar os dados</span>
      </button>
      <button class="button is-light" @click="isBuying = false">
        <span class="icon"><i class="fas fa-map"></i></span> <span>Mapa</span>
      </button>

      <button
        class="button is-light"
        @click="isBuying = true"
        :disabled="isFigthing"
      >
        <span class="icon"><i class="fas fa-shop"></i></span> <span>Loja</span>
      </button>

      <!-- info -->
      <br />
      <small>
        position: {{ position }}, type: {{ checkPosition() }}, map length:
        {{ map.length }}
      </small>
      <hr />

      <!-- map -->
      <div v-show="!isBuying">
        <h4>MAP</h4>
        {{ map }}
        <hr />
      </div>

      <!-- isFighting -->
      <div v-show="isFigthing">
        <h4
          class="has-text-danger has-text-weight-bold is-family-monospace is-size-1"
        >
          Luta
        </h4>
        <SelectMonsterFight
          :myMonsters="myMonsters"
          @selectMonsterToFight="selectMonsterFight"
        />

        <div v-show="isUsingItem">
          <h4>Items</h4>
          <div class="flex-start is-2">
            <div class="card" v-for="(item, idx) in myItems" :key="item.id">
              <img class="poster" :src="item.image" :alt="item.name" />
              <button class="button is-primary" @click="useItem(item, idx)">
                <span class="icon"><i :class="item.icon"></i></span>
                <span>{{ item.name }}</span>
              </button>
            </div>
          </div>
        </div>
        <hr />

        <h5>
          MONSTRO: {{ myMonsterFight.name }} - TYPE:{{ myMonsterFight.type }} -
          HP:{{ myMonsterFight.hp }} - MP:{{ myMonsterFight.mp }}
        </h5>
        <h2 class="has-text-danger	">versus</h2>
        <h5>
          ENEMY: {{ enemyMonsterFight.name }} - TYPE:{{
            enemyMonsterFight.type
          }}
          - HP:{{ enemyMonsterFight.hp }} - MP:{{ enemyMonsterFight.mp }}
        </h5>

        <button
          class="button is-danger"
          @click="hit"
          :disabled="
            Object.keys(myMonsterFight).length === 0 &&
              Object.getPrototypeOf(myMonsterFight) === Object.prototype
          "
        >
          <span class="icon"><i :class="'fas fa-hand-rock'"></i></span>
          <span>HIT!</span>
        </button>
        <button
          class="button is-light"
          @click="isUsingItem = !isUsingItem"
          :disabled="myItems.length < 1"
        >
          <span class="icon"><i class="fas fa-flask"></i></span>
          <span>Usar Item</span>
        </button>
      </div>

      <!-- isBuying -->
      <div v-show="isBuying">
        <Shop :items="items" @selectTheItem="buyItem" />
      </div>
    </div>
    <hr />
  </div>
  <!--isOn-->
</template>

<script>
import Shop from '@/components/Shop.vue';
import SelectHero from '@/components/SelectHero.vue';
import SelectMonsters from '@/components/SelectMonsters.vue';
import SelectMonsterFight from '@/components/SelectMonsterFight.vue';
import SelectMap from '@/components/SelectMap.vue';
import { getData } from '@/composables/getData';
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  setup() {
    const store = useStore();

    function addCount() {
      store.commit('increment');
    }

    let total = computed(() => store.state.count);

    const { items: monsters, error: e1, load: l1 } = getData('monsters');
    const { items: heroes, error: e2, load: l2 } = getData('heroes');
    const { items: maps, error: e3, load: l3 } = getData('maps');
    const { items: items, error: e4, load: l4 } = getData('items');
    l1();
    l2();
    l3();
    l4();

    return { monsters, heroes, maps, items, e1, e2, e3, e4, addCount, total };
  },

  name: 'Game',
  components: {
    Shop,
    SelectHero,
    SelectMonsters,
    SelectMap,
    SelectMonsterFight
  },
  data() {
    return {
      myHero: {},
      myMonsters: [],
      myMap: {},
      myItems: [],
      myMonsterFight: {},
      enemyMonsterFight: {},
      win: false,
      map: [],
      position: 0,
      isFigthing: false,
      isBuying: false,
      isStarted: false,
      isOn: true,
      isUsingItem: false,
      heroDamageMax: 40,
      heroDamageMin: 20,
      enemyDamageMax: 35,
      enemyDamageMin: 15
    };
  },
  methods: {
    start() {
      this.map = [];
      this.generateNewMap();
      this.isStarted = true;
    },
    generateNewMap() {
      let ar = ['._._._._.', '._._._._.', 'fight', 'fight', 'fight', 'gift'];
      for (let i = 0; i < this.myMap.size; i++) {
        this.map.push(ar[Math.floor(Math.random() * ar.length)]);
      }
      this.map[0] = 'start';
    },

    dice() {
      this.isBuying = false;
      this.isUsingItem = false;
      return Math.floor(Math.random() * 6 + 1);
    },

    getPostion(dice) {
      this.position += dice;
      if (this.map.length < this.position) {
        alert('END');
      }
      this.checkPosition();

      if (this.checkPosition() === 'fight') {
        this.isFigthing = true;

        // get random monster
        this.enemyMonsterFight = this.getRandomEnemy();
      } else if (this.checkPosition() === 'gift') {
        // TODO: gift
      } else if (this.checkPosition() === 'boss') {
        // TODO: boss
      }
    },
    checkPosition() {
      return this.map[this.position];
    },

    selectHero(e, id) {
      this.myHero = { ...this.heroes[id - 1] };
    },
    selectMap(e, map) {
      this.myMap = { ...map };
    },
    selectMonster(e, id) {
      this.myMonsters.push({ ...this.monsters[id - 1] });
    },
    selectMonsterFight(e, x) {
      this.myMonsterFight = x;
    },
    removeMonster(monster) {
      this.myMonsters = this.myMonsters.filter(x => x.id !== monster.id);
    },
    restart() {
      this.myHero = {};
      this.myMap = {};
      this.myMonsters = [];
      this.myItems = [];
      this.position = 0;
      this.isFigthing = false;
      this.isStarted = false;
    },
    getRandomEnemy() {
      const max = this.monsters.length;
      return { ...this.monsters[Math.floor(Math.random() * max)] };
    },

    hit() {
      this.enemyMonsterFight.hp -= this.heroHit();
      this.myMonsterFight.hp -= this.enemyHit();

      if (this.enemyMonsterFight.hp < 0) {
        this.win = true;
        this.isFigthing = false;

        alert('you win');
      } else if (this.myMonsterFight.hp < 0) {
        this.isFigthing = false;
        alert('you lose');
      }
    },
    enemyHit() {
      return Math.floor(
        Math.random() * (this.enemyDamageMax - this.enemyDamageMin + 1) +
          this.enemyDamageMin
      );
    },
    heroHit() {
      return Math.floor(
        Math.random() * (this.heroDamageMax - this.heroDamageMin + 1) +
          this.heroDamageMin
      );
    },
    buyItem(e, item) {
      this.myItems.push(item);
    },
    useItem(item, idx) {
      let hp = parseInt(this.myMonsterFight.hp);
      let value = parseInt(item.value);
      this.myMonsterFight.hp = hp + value;
      this.myItems.splice(idx, 1);
    }
  }
};
</script>

<style></style>
