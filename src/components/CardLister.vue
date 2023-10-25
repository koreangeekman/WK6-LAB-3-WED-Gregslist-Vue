<template>
  <div class="col-12 col-md-4 p-3" v-for="item in array" :key="item.id">
    <HouseEntry />
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import HouseEntry from "./Houses/HouseEntry.vue";
export default {
  setup() {
    return {};
  },
  components: { HouseEntry }
};
</script>


<style lang="scss" scoped></style>