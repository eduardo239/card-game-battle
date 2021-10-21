<template>
  <div class="list-item">
    <span class="icon"><i :class="item.icon"></i></span>
    <span> <b>Name:</b> {{ item.name }} </span>
    <span v-if="item.type"><b>Tipo:</b> {{ item.type }} </span>
    <span v-if="item.gender"><b>Gênero:</b> {{ item.gender }} </span>
    <span v-if="item.hp"><b>HP:</b> {{ item.hp }} </span>
    <span v-if="item.mp"><b>MP:</b> {{ item.mp }}</span>
    <span v-if="item.size"><b>Tamanho:</b> {{ item.size }}</span>
    <span v-if="item.level"><b>Level:</b> {{ item.level }}</span>
    <button class="delete" @click="removeItem(name)">
      x
    </button>
  </div>
</template>

<script>
import { useStore } from 'vuex';
export default {
  name: 'Info',
  props: ['item', 'name'],
  setup() {
    const store = useStore();

    function removeItem(name) {
      if (name === 'HERO') store.commit('removeHero');
      else if (name === 'MAP') store.commit('removeMap');
    }
    return {
      removeItem
    };
  }
};
</script>

<style></style>
