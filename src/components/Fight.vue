<template>
  <h4>Luta</h4>
  <div class="fight buttons">
    <button class="button is-danger" @click="hit">ATACAR</button>
    <button class="button is-info" @click="$emit('toggleUseItemModal')">
      USAR ITEM
    </button>
    <button class="button is-light">Trocar de monstro</button>
  </div>

  <span class="has-text-danger">Monstro do herói</span>
  <Info :item="hero" name="HERO" />
  <span class="has-text-danger">Monstro do inimigo</span>
  <Info :item="monster" name="MONSTER" />
</template>

<script>
import Info from '@/components/Info.vue';
import { computed } from 'vue/';
import { useStore } from 'vuex';
import { randomNumber } from '@/utils';

export default {
  name: 'Fight',
  components: { Info },
  props: ['isFighting'],
  emits: ['toggleUseItemModal'],
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
  padding: 8px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}
</style>
