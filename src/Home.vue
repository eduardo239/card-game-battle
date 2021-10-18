<template>
  <transition name="slide-fade">
    <div class="page">
      <Navigation />
      <h2>GAME APP</h2>
      home / game heroes / game2 monsters / game3 maps / game 4 main
    </div>
  </transition>
  <router-view></router-view>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
export default {
  name: 'Home',
  components: { Navigation }
};
</script>

<style>
@import 'https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css';
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css';

*,
*::after,
*::before {
  box-sizing: border-box;
}

.page {
  height: calc(100vh - 12px);
  width: 100%;
  padding: 0.5rem;
}

body {
  background: #fefefe;
  font-weight: 400;
  line-height: 1.75;
  color: #2b2b2b;
  border-top: 6px solid #4240b8;
}

p {
  margin-bottom: 1rem;
}

h1,
h2,
h3,
h4,
h5 {
  margin: 1.38rem 0 1rem;
  font-weight: 400;
  line-height: 1.3;
}

h1 {
  margin-top: 0;
  font-size: 3.052rem;
}

h2 {
  font-size: 2.441rem;
}

h3 {
  font-size: 1.953rem;
}

h4 {
  font-size: 1.563rem;
}

h5 {
  font-size: 1.25rem;
}
img {
  max-width: 100%;
  height: auto;
}
small,
.text_small {
  font-size: 0.8rem;
}

.absolute {
  position: absolute;
}
.relative {
  position: relative;
}
.top-left {
  top: 0;
  left: 0;
}
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

.poster {
  height: 120px;
  border-radius: 3px;
}
</style>
