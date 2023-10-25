<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12 col-md-4 p-3" v-for="house in houses" :key="house.id">
        <HouseEntry :house="house" />
      </div>
    </section>
  </div>
  <HouseForm />
</template>


<script>
import { AppState } from '../AppState';
import { computed, onMounted, onUnmounted } from 'vue';
import { housesService } from "../services/HousesService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import HouseEntry from "../components/Houses/HouseEntry.vue";
import HouseForm from "../components/Houses/HouseForm.vue";

export default {
  setup() {

    async function _getHouses() {
      try {
        await housesService.getHouses()
      } catch (error) {
        logger.error(error)
        Pop.error(error)
      }
    }

    onMounted(() => {
      _getHouses()
    })
    onUnmounted(() => {
      housesService.clearAllData()
    })

    return {
      houses: computed(() => AppState.houses)
    };

  },
  components: { HouseEntry, HouseForm }
};
</script>


<style lang="scss" scoped></style>