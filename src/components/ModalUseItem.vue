<template>
  <div class="modal" @click.self="closeModal">
    <div class="modal-div">
      <div v-if="items.length > 0" class="is-flex is-flex-wrap-wrap">
        <CardUse :data="items" table="useItem" />
      </div>
      <div v-else>Você não possui items.</div>
    </div>
  </div>
</template>

<script>
import CardUse from '@/components/CardUse.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'ModalUseItem',
  components: { CardUse },
  methods: {
    closeModal() {
      this.$emit('close');
    }
  },
  setup() {
    const store = useStore();
    let items = computed(() => store.state.user.items);

    return {
      items
    };
  }
};
</script>

<style></style>
