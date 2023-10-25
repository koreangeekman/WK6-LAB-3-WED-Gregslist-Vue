<template>
  <div class="modal fade" id="houseFormModal" tabindex="-1" aria-labelledby="houseFormLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="houseFormLabel">{{ 'Create' }} House Entry</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="triggerSubmit()">
            <div class="mb-3">
              <label for="imgUrl" class="form-label">House ImgUrl</label>
              <input v-model="editable.imgUrl" type="url" class="form-control" id="imgUrl" required maxlength="500">
            </div>
            <div class="mb-3">
              <label for="year" class="form-label">House Year</label>
              <input v-model="editable.year" type="number" class="form-control" id="year" required>
            </div>
            <div class="mb-3">
              <label for="price" class="form-label">House Price</label>
              <input v-model="editable.price" type="number" class="form-control" id="price" required>
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">House Description</label>
              <textarea v-model="editable.description" maxlength="500" class="form-control" id="description"
                rows="3"></textarea>
            </div>
            <div class="text-end">
              <button class="btn btn-success" type="submit">Submit</button>
            </div>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>


<script>
import { Modal } from "bootstrap";
import { housesService } from "../../services/HousesService";
import { logger } from "../../utils/Logger";
import Pop from "../../utils/Pop";
import { ref } from 'vue';

export default {
  setup() {
    const editable = ref({})

    return {
      editable,


      triggerSubmit() {
        if (editable.value.id) {
          this.updateHouse()
        }
        this.createHouse()
      },

      async createHouse() {
        try {
          await housesService.createHouse(editable.value);
          editable.value = {}
          Modal.getOrCreateInstance('#houseFormModal').hide()
        } catch (error) {
          logger.error(error)
          Pop.error(error)
        }
      },
      async updateHouse() {
        try {
          await housesService.updateHouse(editable.value);
        } catch (error) {
          logger.error(error)
          Pop.error(error)
        }
      }


    }
  }
};
</script>


<style lang="scss" scoped></style>