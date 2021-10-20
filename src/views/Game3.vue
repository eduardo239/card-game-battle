<template>
  <transition name="slide-fade">
    <div class="page">
      <Navigation />
      <h2>MAP</h2>
      <Error :error="error" type="is-success" />
      <Loading :isLoading="!!error && !items" />

      <div
        :class="`is-flex is-flex-wrap-wrap ${!isEmpty(map) ? 'disabled' : ''}`"
      >
        <Card :data="items" table="maps" />
      </div>

      <Info v-if="!isEmpty(map)" :item="map" name="MAP" />
    </div>
  </transition>
</template>

<script>
import Info from '@/components/Info.vue';
import Navigation from '@/components/Navigation.vue';
import Error from '@/components/Error.vue';
import Loading from '@/components/Loading.vue';
import Card from '@/components/Card.vue';
import { getData } from '@/composables/getData';
import { isEmpty } from '@/utils';
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'Maps',
  components: { Navigation, Error, Loading, Card, Info },
  setup() {
    const store = useStore();
    let map = computed(() => store.state.game.map);
    const { items, error, load } = getData('maps');
    load();

    return { items, error, map, isEmpty };
  }
};
</script>

<style></style>
