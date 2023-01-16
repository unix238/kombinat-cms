import axios from 'axios';
import config from '../config/config';

export const FETCH_RESTAURANTS = 'FETCH_RESTAURANTS';
export const SET_RESTAURANTS = 'SET_RESTAURANTS';
export const ADD_RESTAURANT = 'ADD_RESTAURANT';
export const UPDATE_RESTAURANT = 'UPDATE_RESTAURANT';
export const FETCH_FOOD_ITEMS = 'FETCH_FOOD_ITEMS';
export const SET_FOOD_ITEMS = 'SET_FOOD_ITEMS';

export const fetchRestaurants = (state) => {
  return (dispatch) => {
    // Make API call to fetch restaurants
    return axios
      .get(`${config.url}/restaurant/getRestaurants`)
      .then((response) => {
        dispatch(setRestaurants(response.data, state));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const setRestaurants = (restaurants, state) => {
  state(restaurants);
  return {
    type: SET_RESTAURANTS,
    restaurants,
  };
};

export const addRestaurant = (restaurant) => {
  return (dispatch) => {
    // Make API call to add restaurant
    return axios
      .post(`${config.url}/restaurant/addRestaurant`, restaurant)
      .then((response) => {
        dispatch({
          type: ADD_RESTAURANT,
          restaurant: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const setFoodItems = (food) => {
  return {
    type: SET_FOOD_ITEMS,
    foodItems: food,
  };
};

export const fetchFoodItems = (restaurantId, setRestaurantFood) => {
  return (dispatch) => {
    // Make API call to fetch food items
    return axios
      .get(`${config.url}/food/getRestaurantFood`, {
        params: {
          restaurant: restaurantId,
        },
      })
      .then((response) => {
        dispatch(setFoodItems(response.data));
        setRestaurantFood(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const updateRestaurant = (restaurant) => {
  return (dispatch) => {
    // Make API call to update restaurant
    return axios
      .put(`${config.url}/restaurant/editRestaurant`, {
        params: {
          id: restaurant._id,
        },
        restaurant,
      })
      .then((response) => {
        console.log({ response: response.data });
        dispatch({
          type: UPDATE_RESTAURANT,
          restaurant: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};
