import {
  SET_RESTAURANTS,
  ADD_RESTAURANT,
  FETCH_FOOD_ITEMS,
  SET_FOOD_ITEMS,
  UPDATE_RESTAURANT,
} from '../actions/restaurantActions';

const initialState = {
  restaurants: [],
};

export default function restaurantReducer(state = initialState, action) {
  switch (action.type) {
    case SET_RESTAURANTS:
      return {
        ...state,
        restaurants: action.restaurants,
      };
    case ADD_RESTAURANT:
      return {
        ...state,
        restaurants: [...state.restaurants, action.restaurant],
      };
    case UPDATE_RESTAURANT:
      return {
        ...state,
        restaurants: state.restaurants.map((restaurant) => {
          console.log(restaurant);
          if (restaurant._id === action.restaurant._id) {
            return action.restaurant;
          }
          return restaurant;
        }),
      };
    case FETCH_FOOD_ITEMS:
      return {
        ...state,
        foodItems: action.foodItems,
      };
    case SET_FOOD_ITEMS:
      return {
        ...state,
        foodItems: action.foodItems,
      };

    default:
      return state;
  }
}
