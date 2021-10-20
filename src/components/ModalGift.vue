<template>
  <div class="modal" @click.self="closeModal">
    <div class="modal-div">
      <div class="is-flex is-flex-wrap-wrap is-justify-content-center">
        <CardItem :data="gift" @closeModal="closeModal" />
      </div>
    </div>
  </div>
</template>

<script>
import CardItem from '@/components/CardItem.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'GiftShop',
  components: { CardItem },
  props: [],
  setup() {
    const store = useStore();
    let items = computed(() => store.state.user.items);
    let gameItems = computed(() => store.state.game.items);
    let gift = computed(() => store.state.game.gift);

    function closeModal() {
      store.commit('closeGiftModal');
    }

    return {
      items,
      gift,
      gameItems,
      closeModal
    };
  }
};
</script>

<style></style>
