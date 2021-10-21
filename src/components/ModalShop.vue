<template>
  <div class="modal" @click.self="closeModal">
    <div class="modal-div">
      <h4 style="background: white; text-align: center;">
        saldo: {{ heroMoney }}
      </h4>
      <div class="is-flex is-flex-wrap-wrap is-justify-content-center">
        <Card :data="gameItems" table="buyItem" />
      </div>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'ModalShop',
  components: { Card },
  props: [],
  methods: {
    closeModal() {
      this.$emit('close');
    }
  },
  setup() {
    const store = useStore();
    let items = computed(() => store.state.user.items);
    let gameItems = computed(() => store.state.game.items);
    let heroMonsters = computed(() => store.state.fight.hero.monster);
    let enemyMonster = computed(() => store.state.fight.enemy.monster);
    let heroMoney = computed(() => store.state.user.money);

    return {
      heroMonsters,
      enemyMonster,
      items,
      gameItems,
      heroMoney
    };
  }
};
</script>

<style></style>
