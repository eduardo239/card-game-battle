<template>
  <div class="modal" @click.self="closeModal">
    <div class="modal-div">
      <h4 style="background: white; text-align: center;">
        Selecione um monstro para lutar.
      </h4>
      <div
        v-if="monsters.length > 0"
        class="is-flex is-flex-wrap-wrap is-justify-content-center"
      >
        <CardUse :data="monsters" table="selectMonster" />
      </div>
      <div v-else>Você não possui monstros.</div>
    </div>
  </div>
</template>

<script>
import CardUse from '@/components/CardUse.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'ModalSelectMonster',
  components: { CardUse },
  methods: {
    closeModal() {
      this.$emit('close');
    }
  },
  setup() {
    const store = useStore();
    let monsters = computed(() => store.state.user.monsters);

    return {
      monsters
    };
  }
};
</script>

<style></style>
