<template>
  <div class="modal" @click.self="closeModal">
    <div class="modal-div">
      saldo: {{ heroMoney }}

      <div class="is-flex is-flex-wrap-wrap">
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

<style>
.modal {
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);

  width: 100%;
  height: 100vh;
}
</style>
