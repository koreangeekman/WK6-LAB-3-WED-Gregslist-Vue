<template>
  <div class="card">
    <img :src="house.imgUrl">
    <p class="price fs-4 mb-0 px-2 py-1">{{ house.price }}</p>
    <i class="deleteBtn text-danger fs-2 px-2 mdi mdi-trash-can" v-if="house.creator.id == AppState.account.id"></i>
    <p class="description">{{ house.description }}</p>
    <span class="d-flex justify-content-evenly">
      <span>
        <p>Year: {{ house.year }}</p>
        <p>Levels: {{ house.levels }}</p>
      </span>
      <span>
        <p>Bedrooms: {{ house.bedrooms }}</p>
        <p>Bathrooms: {{ house.bathrooms }}</p>
      </span>
    </span>
  </div>
</template>


<script>
import { AppState } from "../../AppState";
import { House } from "../../models/House";

export default {
  props: {
    house: { type: House },
  },
  setup() {
    return {
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
  top: 3px;
  left: 3px;
  border-radius: 0.5rem;
  background-color: green;
  color: white;
}

.deleteBtn {
  position: absolute;
  top: 3px;
  right: 3px;
  border-radius: 0.5rem;
  background-color: #ffffffb9;
}
</style>