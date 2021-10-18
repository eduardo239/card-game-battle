import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/Home.vue';
import About from '@/components/About.vue';
import Game from '@/components/Game.vue';
import Game2 from '@/components/Game2.vue';
import Game3 from '@/components/Game3.vue';
import Game4 from '@/components/Game4.vue';
import Game5 from '@/components/Game5.vue';
import Test from '@/components/Test.vue';
import NotFound from '@/components/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/1',
    name: 'Game',
    component: Game
  },
  {
    path: '/2',
    name: 'Game2',
    component: Game2
  },
  {
    path: '/3',
    name: 'Game3',
    component: Game3
  },
  {
    path: '/4',
    name: 'Game4',
    component: Game4
  },
  {
    path: '/5',
    name: 'Game5',
    component: Game5
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/:catchAll(.*)',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
