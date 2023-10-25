<template>
  <div class="card">
    <img :src="houses.imgUrl">
    <p class="price">{{ houses.price }}</p>
    <p class="description">{{ houses.description }}</p>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, inject } from 'vue';

export default {
  setup() {
    return {
      houses: inject('housesData')
    }
  }
};
</script>


<style lang="scss" scoped>
.card {
  position: relative;
}

.price {
  position: absolute;
  top: 0;
  left: 0;
  margin-bottom: 0;
  border-radius: 0.5rem;
  background-color: green;
  color: white;
}
</style>