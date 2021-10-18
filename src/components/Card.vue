<template>
  <div class="card mx-1 mb-3" v-for="x in data" :key="x.id">
    <img class="poster" :src="x.image" :alt="x.name" />
    <div class="p-2">
      <div class="is-size-5">{{ x.name }}</div>
      <div class="is-flex is-justify-content-space-between is-size-7">
        <span>TIPO: {{ x.type }}</span>
      </div>

      <div class="is-flex is-justify-content-space-between is-size-7">
        <span>LVL: {{ x.level }}</span>
        <span>EXP: {{ x.exp }}</span>
        <span>NEX: {{ x.nextLevel }}</span>
      </div>
    </div>
    <button
      class="button is-link"
      @click="
        table === 'monsters'
          ? addMonsters(x)
          : table === 'heroes'
          ? addHero(x)
          : table === 'maps'
          ? addMap(x)
          : alert('error-98375934')
      "
    >
      {{ x.name }}
    </button>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from '@vue/reactivity';

export default {
  name: 'Card',
  props: ['data', 'table'],
  data() {
    return {
      item: {}
    };
  },
  setup() {
    const store = useStore();

    function addHero(item) {
      store.commit('addHero', item);
    }

    function addMonsters(item) {
      store.commit('addMonsters', item);
    }
    function addMap(item) {
      store.commit('addMap', item);
    }

    let monsters = computed(() => store.state.user.monsters);

    return { addHero, addMonsters, addMap, monsters };
  }
};
</script>

<style>
.card {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.list-item {
  padding: 8px;
  margin-bottom: 3px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}
</style>
