import { AppState } from "../AppState";
import { Car } from "../models/Car";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class CarsService {

  async getCars() {
    const res = await api.get('api/cars');
    const cars = res.data.map(car => new Car(car))
    AppState.cars = cars
    return cars
  }

  async getCarById(carId) {
    const res = await api.get(`api/cars/${carId}`);
    return new Car(res.data)
  }

  // 🔽 AUTHENTICATION REQUIRED 🔽

  async createCar(body) {
    const res = await api.post('api/cars', body);
    const newCar = new Car(res.data);
    AppState.cars.unshift(newCar);
    return newCar
  }

  async removeCar(carId, userId) {
    const toBeDeletedIndex = AppState.cars.findIndex(h => h.id = carId)
    if (toBeDeletedIndex == -1) { throw new logger.error('Unable to locate car with ID: ', carId); }
    const toBeDeleted = await api.get(`api/cars/${carId}`)
    if (toBeDeleted.data.creatorId != userId) { throw new logger.error('Not your entry to remove'); }

    const res = await api.delete(`api/cars/${carId}`);

    AppState.cars.splice(toBeDeletedIndex, 1);
    return res.data
  }

  async updateCar(carId, newBody, userId) {
    const toBeUpdatedIndex = AppState.cars.findIndex(h => h.id = carId)
    if (toBeUpdatedIndex == -1) { throw new logger.error('Unable to locate car with ID: ', carId); }
    const toBeUpdated = await api.get(`api/cars/${carId}`)
    if (toBeUpdated.data.creatorId != userId) { throw new logger.error('Not your entry to remove'); }

    toBeUpdated.year = newBody.year || toBeUpdated.year
    toBeUpdated.price = newBody.price || toBeUpdated.price
    toBeUpdated.imgUrl = newBody.imgUrl || toBeUpdated.imgUrl
    toBeUpdated.levels = newBody.levels || toBeUpdated.levels
    toBeUpdated.bedrooms = newBody.bedrooms || toBeUpdated.bedrooms
    toBeUpdated.bathrooms = newBody.bathrooms || toBeUpdated.bathrooms
    toBeUpdated.description = newBody.description || toBeUpdated.description

    const res = await api.put(`api/cars/${carId}`, toBeUpdated);

    AppState.cars.splice(toBeUpdatedIndex, 1, new Car(res.data));
    return res.data
  }

}

export const carsService = new CarsService();