<template>
  <transition name="slide-fade">
    <div class="page">
      <Navigation />

      <h2>MONSTERS</h2>
      <Error :error="error" type="is-success" />
      <Loading :isLoading="!!error && !items" />

      <div class="is-flex is-flex-wrap-wrap">
        <Card :data="items" table="monsters" />
      </div>

      <InfoList :items="monsters" name="MONSTER" />
    </div>
  </transition>
</template>

<script>
import InfoList from '@/components/InfoList.vue';
import Navigation from '@/components/Navigation.vue';
import Error from '@/components/Error.vue';
import Loading from '@/components/Loading.vue';
import Card from '@/components/Card.vue';
import { getData } from '@/composables/getData';
import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
  name: 'Monsters',
  components: { Navigation, Error, Loading, Card, InfoList },
  setup() {
    const store = useStore();
    let monsters = computed(() => store.state.user.monsters);
    const { items, error, load } = getData('monsters');
    load();

    return { items, error, monsters };
  }
};
</script>

<style></style>
