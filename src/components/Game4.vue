<template>
  <transition name="slide-fade">
    <div class="page">
      <Navigation />
      <h4>Jogar</h4>

      <Error
        :error="isEmpty(hero) && 'O herói não foi escolhido'"
        type="is-warning"
      />
      <Error
        :error="isEmpty(map) && 'O mapa não foi escolhido'"
        type="is-warning"
      />
      <Error
        :error="monsters.length === 0 && 'Os monstros não foram escolhidos'"
        type="is-warning"
      />

      <main>
        <div class="buttons mb-2 menu-sticky">
          <div class="button is-danger" @click="play">
            Play
          </div>
          <div class="button is-info" @click="toggleModal">Loja</div>
          <div class="button is-warning">Reiniciar</div>
        </div>

        <!-- actual postion -->
        Posição atual: {{ current }} - Valor do dado: {{ dice }} - Tamanho do
        mapa:
        {{ positions.length }}

        <!-- positions -->
        <div class="is-flex is-flex-wrap-wrap ">
          <div class="" v-for="(position, i) in positions" :key="i">
            <div
              style="position: relative"
              :class="
                `position ${
                  position === 'FIGHT'
                    ? 'fight'
                    : position === 'TRAP'
                    ? 'trap'
                    : position === 'GIFT'
                    ? 'gift'
                    : position === 'BOSS'
                    ? 'boss'
                    : position === 'START'
                    ? 'start'
                    : ''
                } ${i == current ? 'current ' : ''} ${
                  current > i ? 'passed' : ''
                }`
              "
            >
              {{ position }}
              <span class="absolute top-left card-item-id">{{ i }}</span>
            </div>
          </div>
        </div>

        <!-- shop -->
        {{ showModal }}
        <ModalShop v-if="showModal" @close="toggleModal" />
      </main>

      <hr />

      <span class="has-text-danger is-size-5">hero</span>
      <div class="list-item">
        <span><b>Name:</b> {{ hero.name }}</span
        >, <span><b>Tipo:</b> {{ hero.type }}</span
        >, <span><b>Gênero:</b> {{ hero.gender }}</span>
      </div>

      <hr />

      <span class="has-text-danger is-size-5">monsters</span>
      <div class="list-item" v-for="monster in monsters" :key="monster.id">
        <div>
          <span><b>Name:</b> {{ monster.name }}</span
          >, <span><b>Tipo:</b> {{ monster.type }}</span
          >, <span><b>Gênero:</b> {{ monster.gender }}</span>
        </div>
      </div>

      <hr />

      <span class="has-text-danger is-size-5">map</span>
      <div class="list-item">
        <span><b>Name:</b> {{ map.name }}</span
        >, <span><b>Tipo:</b> {{ map.type }}</span
        >, <span><b>Tamanho:</b> {{ map.size }}</span>
      </div>

      <hr />

      <span class="has-text-danger is-size-5">items</span>
      <div class="list-item" v-for="item in items" :key="item.id">
        <div>
          <span><b>Name:</b> {{ item.name }}</span
          >, <span><b>Tipo:</b> {{ item.type }}</span
          >, <span><b>Gênero:</b> {{ item.gender }}</span>
        </div>
      </div>

      <hr />
    </div>
  </transition>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import Error from '@/components/Error.vue';
import ModalShop from '@/components/ModalShop.vue';
import { useStore } from 'vuex';
import { computed } from '@vue/reactivity';
import { isEmpty } from '@/utils';

export default {
  name: 'Card',
  props: ['data'],
  components: { ModalShop, Navigation, Error },
  data() {
    return {
      item: {},
      showModal: false
    };
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    }
  },
  setup() {
    const store = useStore();

    let hero = computed(() => store.state.user.hero);
    let monsters = computed(() => store.state.user.monsters);
    let items = computed(() => store.state.user.items);
    let map = computed(() => store.state.game.map);
    let positions = computed(() => store.state.game.positions);
    let current = computed(() => store.state.game.position);
    let dice = computed(() => store.state.game.dice);

    function play() {
      store.commit('randomNumber', { max: 6, min: 1 });
      store.commit('getPosition', dice.value);
    }

    return {
      hero,
      monsters,
      items,
      map,
      positions,
      current,
      dice,
      isEmpty,
      play
    };
  }
};
</script>

<style>
.menu-sticky {
  position: sticky;
  z-index: 500;
  top: 0;
  background: white;
}

.position {
  height: 100px;
  width: 100px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.current {
  outline: 3px dashed crimson;
}

.position.start {
  background: #c0f5ff;
  color: #000;
}

.position.fight {
  background: #ffcdf3;
  color: #000;
}

.position.gift {
  background: #beffbe;
  color: #000;
}

.position.trap {
  background: #fbffc4;
  color: #000;
}

.position.boss {
  background: black;
  color: #fff;
}

.passed {
  background: #161616 !important;
  color: #919191 !important;
}
</style>
