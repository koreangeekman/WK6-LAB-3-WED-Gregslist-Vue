<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12">
        <!-- <PageNav /> -->
      </div>
      <div class="col-12">
        <section class="row">
          <div class="col-12 col-md-4 p-3" v-for="house in houses" :key="house.id">
            <HouseEntry :house="house" />
          </div>
        </section>
      </div>
    </section>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, onMounted } from 'vue';
import { housesService } from "../services/HousesService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import HouseEntry from "../components/Houses/HouseEntry.vue";

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

    return {
      houses: computed(() => AppState.houses)
    };

  },
  components: { HouseEntry }
};
</script>


<style lang="scss" scoped></style>