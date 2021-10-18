<template>
  <transition name="slide-fade">
    <div class="page">
      <Navigation />

      <h2>HERO</h2>
      <Error :error="error" type="is-success" />
      <Loading :isLoading="!!error && !items" />

      <div class="is-flex is-flex-wrap-wrap">
        <Card :data="items" table="heroes" />
      </div>
    </div>
  </transition>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import Error from '@/components/Error.vue';
import Loading from '@/components/Loading.vue';
import Card from '@/components/Card.vue';
import { getData } from '@/composables/getData';

export default {
  name: 'Hero',
  components: { Navigation, Error, Loading, Card },
  setup() {
    const { items, error, load } = getData('heroes');
    load();

    return { items, error };
  }
};
</script>

<style></style>
