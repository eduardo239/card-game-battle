<template>
  <h4>Luta</h4>
  <div class="fight">
    <button class="button is-danger" @click="hit">hit</button>
    <button class="button is-info">use item</button>
  </div>
  {{ hero }}
  {{ monster }}
  <hr />
  <span class="has-text-danger is-size-5">hero monster</span>
  <div class="list-item">
    <span><b>Name:</b> {{ hero.name }}</span
    >, <span><b>Tipo:</b> {{ hero.type }}</span
    >, <span><b>Gênero:</b> {{ hero.gender }}</span
    >, <span><b>HP:</b> {{ hero.hp }}</span
    >, <span><b>MP:</b> {{ hero.mp }}</span>
  </div>
  <br />
  <span class="has-text-danger is-size-5">enemy monster</span>
  <div class="list-item">
    <span><b>Name:</b> {{ monster.name }}</span
    >, <span><b>Tipo:</b> {{ monster.type }}</span
    >, <span><b>Gênero:</b> {{ monster.gender }}</span
    >, <span><b>HP:</b> {{ monster.hp }}</span
    >, <span><b>MP:</b> {{ monster.mp }}</span>
  </div>
</template>

<script>
import { computed } from 'vue/';
import { useStore } from 'vuex';
import { randomNumber } from '@/utils';

export default {
  name: 'Fight',
  props: ['isFighting'],
  setup() {
    const store = useStore();

    let hero = computed(() => store.state.fight.hero.monster);
    let monster = computed(() => store.state.fight.enemy.monster);

    function hit() {
      let damage = parseInt(randomNumber(50, 35));
      store.commit('damage', { damage, at: 'enemy' });
    }
    return {
      hero,
      monster,
      hit
    };
  }
};
</script>

<style>
.fight {
  position: sticky;
  z-index: 600;
  background: #fff;
  top: 0;
}
</style>
