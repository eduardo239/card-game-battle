<template>
  <transition name="slide-fade">
    <div class="page">
      <Navigation />

      <h2>HERO</h2>
      <Error :error="error" type="is-success" />
      <Loading :isLoading="!!error && !items" />

      <div
        :class="`is-flex is-flex-wrap-wrap ${!isEmpty(hero) ? 'disabled' : ''}`"
      >
        <Card :data="items" table="heroes" />
      </div>

      <Info v-if="!isEmpty(hero)" :item="hero" name="HERO" />
    </div>
  </transition>
</template>

<script>
import Info from '@/components/Info.vue';
import Navigation from '@/components/Navigation.vue';
import Error from '@/components/Error.vue';
import Loading from '@/components/Loading.vue';
import Card from '@/components/Card.vue';
import { isEmpty } from '@/utils';
import { getData } from '@/composables/getData';
import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
  name: 'Hero',
  components: { Navigation, Error, Loading, Card, Info },
  setup() {
    const store = useStore();
    let hero = computed(() => store.state.user.hero);
    const { items, error, load } = getData('heroes');
    load();

    return { items, error, hero, isEmpty };
  }
};
</script>

<style></style>
