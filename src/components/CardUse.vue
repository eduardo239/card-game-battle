<template>
  <div class="card-item mx-1 mb-3" v-for="(x, i) in data" :key="x.id">
    <div class="relative">
      <img class="poster" :src="x.image" :alt="x.name" />
      <span class="absolute top-left card-item-id">{{ x.id }}</span>
    </div>

    <div class="px-2 pb-2">
      <div class="is-size-5">{{ x.name }}</div>
      <div class="is-flex is-justify-content-space-between is-size-7">
        <span v-if="x.type">TIPO: {{ x.type.toUpperCase() }}</span>
      </div>

      <div class="is-flex is-justify-content-space-between is-size-7 mb-5">
        <span v-if="x.level">LVL: {{ x.level }}</span>
        <span v-if="x.exp">EXP: {{ x.exp }}</span>
        <span v-if="x.nextLevel">NEX: {{ x.nextLevel }}</span>
        <span v-if="x.price">PREÇO: {{ x.price }}</span>
        <span v-if="x.size">TAMANHO: {{ x.size }}</span>
      </div>

      <button
        style="width: 100%"
        class="button is-link"
        @click="useItem(table === 'useItem' ? 'useItem' : '', x, i)"
      >
        Usar
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
  name: 'CardUse',
  props: ['data', 'table'],
  emits: ['closeModal'],
  methods: {
    closeModal() {
      console.log(2);
      this.$emit('close');
    }
  },
  setup() {
    const store = useStore();
    let items = computed(() => store.state.user.items);

    function useItem(table, item, i) {
      let func = table === 'useItem' ? 'useItem' : '';
      store.commit(func, { item, i });
    }

    return {
      items,
      useItem
    };
  }
};
</script>

<style></style>
