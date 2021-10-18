import { ref } from 'vue';
import api from '@/api';

export const getData = table => {
  const items = ref([]);
  const error = ref(null);

  const load = async () => {
    try {
      let data = await api.get(table);
      let res = await data.data;

      items.value = res;
    } catch (e) {
      error.value = e.message;
    }
  };

  return { items, error, load };
};
