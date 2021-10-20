<template>
  <div class="list-item" v-for="(item, i) in items" :key="item.id">
    <span class="icon"><i :class="item.icon"></i></span>
    <span><b>Name:</b> {{ item.name }}</span>
    <span v-if="item.type"><b>Tipo:</b> {{ item.type }}</span>
    <span v-if="item.gender"><b>Gênero:</b> {{ item.gender }}</span>
    <span v-if="item.description"
      ><b>Descrição:</b> {{ item.description }} -
    </span>
    <span v-if="item.hp"><b>HP:</b> {{ item.hp }}</span>
    <span v-if="item.mp"><b>MP:</b> {{ item.mp }} </span>
    <span v-if="item.level"><b>Level:</b> {{ item.level }} </span>
    <span v-if="item.price"><b>Price:</b> {{ item.price }} </span>
    <span v-if="item.value"><b>Valor:</b> {{ item.value }} </span>
    <button class="delete" @click="removeItem(name, i)"></button>
  </div>
</template>

<script>
import { useStore } from 'vuex';
export default {
  name: 'Info',
  props: ['items', 'name'],
  setup() {
    const store = useStore();

    function removeItem(name, i) {
      if (name === 'MONSTER') store.commit('removeMonster', i);
      else if (name === 'ITEM') store.commit('removeItem', i);
    }
    return {
      removeItem
    };
  }
};
</script>

<style></style>
