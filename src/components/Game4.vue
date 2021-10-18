<template>
  <transition name="slide-fade">
    <div class="page">
      <Navigation />
      <h2>MENU</h2>

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
      <span class="has-text-danger is-size-5">maps</span>
      <div class="list-item">
        <span><b>Name:</b> {{ map.name }}</span
        >, <span><b>Tipo:</b> {{ map.type }}</span
        >, <span><b>Tamanho:</b> {{ map.size }}</span>
      </div>

      <hr />
      <span class="has-text-danger is-size-5">items</span>
    </div>
  </transition>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import { useStore } from 'vuex';
import { computed } from '@vue/reactivity';

export default {
  name: 'Card',
  props: ['data'],
  components: { Navigation },
  data() {
    return {
      item: {}
    };
  },
  setup() {
    const store = useStore();

    let hero = computed(() => store.state.user.hero);
    let monsters = computed(() => store.state.user.monsters);
    let map = computed(() => store.state.game.map);

    return { hero, monsters, map };
  }
};
</script>

<style></style>
