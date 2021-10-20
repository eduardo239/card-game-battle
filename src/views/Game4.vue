<template>
  <transition name="slide-fade">
    <div class="page">
      <Navigation />
      <h4>Jogar</h4>

      <div class="is-4" style="display: flex; flex-wrap: wrap; gap: 4px;">
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
          style="height: 68px;"
        />
      </div>

      <main>
        <div class="buttons mb-2 menu-sticky">
          <button
            class="button is-danger"
            @click="play"
            :disabled="
              isEmpty(map) ||
                monsters.length === 0 ||
                isEmpty(hero) ||
                isFighting
            "
          >
            Play
          </button>
          <button
            class="button is-info"
            @click="toggleModal"
            :disabled="isFighting"
          >
            Loja
          </button>
          <button class="button is-warning" @click="restart">Reiniciar</button>
        </div>

        <!-- actual postion -->
        <small class="mo">
          Posição atual: {{ current }} - Valor do dado: {{ dice }} - Tamanho do
          mapa: {{ positions.length }} - items {{ items.length }} - Gift
          {{ isGifting }}
        </small>

        <!-- fight -->
        <Fight v-if="isFighting" @toggleUseItemModal="toggleUseItemModal" />

        <!-- gift -->
        <ModalGift v-if="isGifting" />

        <!-- shop -->
        <ModalShop v-if="showModal" @close="toggleModal" />

        <!-- positions -->
        <Positions :positions="positions" :current="current" />

        <!-- useItem -->
        <ModalUseItem v-if="showUseItemModal" @close="toggleUseItemModal" />
      </main>

      <hr />
      <Info v-if="!isEmpty(hero)" :item="hero" name="HERO" />
      <InfoList :items="monsters" name="MONSTER" />
      <Info v-if="!isEmpty(map)" :item="map" name="MAP" />
      <InfoList :items="items" name="ITEM" />

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  </transition>
</template>

<script>
import Info from '@/components/Info.vue';
import InfoList from '@/components/InfoList.vue';
import Navigation from '@/components/Navigation.vue';
import Error from '@/components/Error.vue';
import ModalShop from '@/components/ModalShop.vue';
import Fight from '@/components/Fight.vue';
import ModalGift from '@/components/ModalGift.vue';
import Positions from '@/components/Positions.vue';
import ModalUseItem from '@/components/ModalUseItem.vue';
import { useStore } from 'vuex';
import { computed, onMounted } from 'vue';
import { getData } from '@/composables/getData';
import { randomNumber, isEmpty } from '@/utils';

export default {
  name: 'Game',
  props: ['data'],
  components: {
    ModalShop,
    ModalUseItem,
    Navigation,
    Error,
    Fight,
    ModalGift,
    Positions,
    Info,
    InfoList
  },
  data() {
    return {
      showModal: false,
      showUseItemModal: false
    };
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },
    toggleUseItemModal() {
      this.showUseItemModal = !this.showUseItemModal;
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
    let isFighting = computed(() => store.state.status.isFighting);
    let isGifting = computed(() => store.state.status.isGifting);

    function play() {
      let x = randomNumber(6, 1);
      store.commit('getPosition', x);
    }

    function loadData() {
      const { items: gameMonsters, load: l1 } = getData('monsters');
      const { items: shopItems, load: l2 } = getData('items');

      l1();
      l2();
      store.commit('loadMonsters', { monsters: gameMonsters });
      store.commit('loadShopItems', { items: shopItems });
    }

    function restart() {
      store.commit('restartGame');
    }
    onMounted(() => {
      loadData();
    });

    return {
      hero,
      monsters,
      items,
      map,
      positions,
      current,
      dice,
      isEmpty,
      play,
      restart,
      isFighting,
      isGifting
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
  padding: 8px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}
</style>
