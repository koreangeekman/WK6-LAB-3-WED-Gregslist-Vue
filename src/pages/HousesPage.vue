<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12">
        <!-- <PageNav /> -->
      </div>
      <div class="col-12">
        <section class="row">
          <CardLister />
        </section>
      </div>
    </section>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, provide } from 'vue';
import CardLister from "../components/CardLister.vue";
provide('carsData', AppState.cars)
provide('housesData', AppState.houses)
provide('jobsData', AppState.jobs)

export default {
  setup() {
    return {};
  },
  components: { CardLister }
};
</script>


<style lang="scss" scoped></style>