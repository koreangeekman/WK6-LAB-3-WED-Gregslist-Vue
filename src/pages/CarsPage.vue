<template>
  <div class="container-fluid">
    <section class="row">
      <div v-for="car in cars" :key="car.id" class="col-md-6 p-4">
        <CarEntry :carProp="car" />
      </div>
    </section>
  </div>

  <CarForm />
</template>


<script>
import { computed, onMounted, onUnmounted } from 'vue';
import Pop from '../utils/Pop.js';
import { carsService } from '../services/CarsService.js'
import { AppState } from '../AppState.js'
import CarForm from '../components/Cars/CarForm.vue';
import CarEntry from '../components/Cars/CarEntry.vue';

export default {
  // NOTE no props on pages
  setup() {
    async function getCars() {
      try {
        await carsService.getCars();
      }
      catch (error) {
        Pop.error(error);
      }
    }
    onMounted(() => {
      carsService.clearData()
      getCars();
    });
    onUnmounted(() => {
      carsService.clearAllData()
    });
    return {
      cars: computed(() => AppState.cars),
      account: computed(() => AppState.account)
    };
  },
  components: { CarForm, CarEntry }
}
</script>


<style lang="scss" scoped></style>