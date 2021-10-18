<template>
  <Toast type="is-primary" :message="message" @closeToast="closeToast" />
  <div class="card-item mx-1 mb-3" v-for="x in data" :key="x.id">
    <div class="relative">
      <img class="poster" :src="x.image" :alt="x.name" />
      <span class="absolute top-left card-item-id">{{ x.id }}</span>
    </div>
    <div class="px-2 pb-2">
      <div class="is-size-5">{{ x.name }}</div>
      <div class="is-flex is-justify-content-space-between is-size-7">
        <span>TIPO: {{ x.type }}</span>
      </div>

      <div class="is-flex is-justify-content-space-between is-size-7">
        <span>LVL: {{ x.level }}</span>
        <span v-if="x.exp">EXP: {{ x.exp }}</span>
        <span v-if="x.nextLevel">NEX: {{ x.nextLevel }}</span>
      </div>
      <button
        style="width: 100%"
        class="button is-link"
        @click="
          addItem(
            table === 'monsters'
              ? 'monsters'
              : table === 'heroes'
              ? 'heroes'
              : table === 'maps'
              ? 'maps'
              : '',
            x
          )
        "
      >
        Selecionar
      </button>
    </div>
  </div>
</template>

<script>
import Toast from '@/components/Toast.vue';
import { useStore } from 'vuex';
import { computed, ref } from 'vue';

export default {
  name: 'Card',
  props: ['data', 'table'],
  components: { Toast },
  data() {
    return {};
  },
  setup() {
    const store = useStore();
    const message = ref('');

    function addItem(table, item) {
      let func =
        table === 'heroes'
          ? 'addHero'
          : table === 'monsters'
          ? 'addMonsters'
          : table === 'maps'
          ? 'addMap'
          : '';
      store.commit(func, item);
      message.value = 'Adicionado com sucesso';
      setTimeout(() => closeToast(), 1000);
    }

    function closeToast() {
      message.value = '';
    }

    let monsters = computed(() => store.state.user.monsters);

    return {
      monsters,
      message,
      closeToast,
      addItem
    };
  }
};
</script>

<style>
.card-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;

  border-radius: 3px;
}
.card-item:hover {
  background: rgba(72, 95, 199, 0.1);
}
.card-item.active {
  outline: 2px solid #485fc7;
}

.card-item-id {
  color: rgba(27, 27, 27, 0.7);
  background: rgba(202, 202, 202, 0.2);
  width: 1rem;
  display: block;
  text-align: center;
  font-size: 0.6rem;
}

.list-item {
  padding: 8px;
  margin-bottom: 3px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}
</style>
