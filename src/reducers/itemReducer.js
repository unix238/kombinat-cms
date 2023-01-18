import {
  SET_ITEMS,
  ADD_ITEM,
  UPDATE_ITEM,
  SET_BRANDS,
  SET_CATEGORIES,
  SET_TAGS,
} from '../actions/itemsActions';

const initialState = {
  items: [],
  brands: [],
  categories: [],
  tags: [],
};

export default function itemReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ITEMS:
      return {
        ...state,
        items: action.items,
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.items],
      };
    case UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map((item) => {
          if (item._id === action.item._id) {
            return action.item;
          }
          return item;
        }),
      };
    case SET_BRANDS:
      return {
        ...state,
        brands: action.brands,
      };
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
      };
    case SET_TAGS:
      return {
        ...state,
        tags: action.tags,
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.item],
      };

    case UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map((item) => {
          if (item._id === action.item._id) {
            return action.item;
          }
          return item;
        }),
      };
    default:
      return state;
  }
}
