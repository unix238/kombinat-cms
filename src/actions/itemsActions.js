import axios from 'axios';
import config from '../config/config';
import Cookies from 'js-cookie';

export const FETCH_ITEMS = 'FETCH_RESTAURANTS';
export const SET_ITEMS = 'SET_RESTAURANTS';
export const ADD_ITEM = 'ADD_RESTAURANT';
export const UPDATE_ITEM = 'UPDATE_RESTAURANT';
export const FETCH_FOOD_ITEMS = 'FETCH_FOOD_ITEMS';
export const SET_FOOD_ITEMS = 'SET_FOOD_ITEMS';
export const FETCH_BRANDS = 'FETCH_BRANDS';
export const SET_BRANDS = 'SET_BRANDS';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const FETCH_TAGS = 'FETCH_TAGS';
export const SET_TAGS = 'SET_TAGS';

export const fetchItems = (state) => {
  return (dispatch) => {
    // Make API call to fetch restaurants
    return axios
      .get(`${config.url}/items/all`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      })
      .then((response) => {
        dispatch(setItems(response.data, state));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const setItems = (items, state) => {
  state(items);
  return {
    type: SET_ITEMS,
    items,
  };
};

export const setBrands = (brands, setter) => {
  setter(brands);
  return {
    type: SET_BRANDS,
    brands,
  };
};

export const fetchBrands = (state) => {
  return (dispatch) => {
    // Make API call to fetch restaurants
    return axios
      .get(`${config.url}/items/brands`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      })
      .then((response) => {
        dispatch(setBrands(response.data, state));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const setCategories = (categories, setter) => {
  setter(categories);
  return {
    type: SET_CATEGORIES,
    categories,
  };
};

export const fetchCategories = (state) => {
  return (dispatch) => {
    // Make API call to fetch restaurants
    return axios
      .get(`${config.url}/items/categories`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      })
      .then((response) => {
        dispatch(setCategories(response.data, state));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const setTags = (tags, setter) => {
  setter(tags);
  return {
    type: SET_TAGS,
    tags,
  };
};

export const fetchTags = (state) => {
  return (dispatch) => {
    return axios
      .get(`${config.url}/items/tags`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      })
      .then((response) => {
        dispatch(setTags(response.data, state));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const addItem = (item) => {
  return (dispatch) => {
    return axios
      .post(
        `${config.url}/items/addItem`,
        { item },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      )
      .then((response) => {
        dispatch({
          type: ADD_ITEM,
          item: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const updateItem = (newitem, id) => {
  return (dispatch) => {
    return axios
      .post(
        `${config.url}/items/updateItem`,
        {
          newitem: newitem,
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      )
      .then((response) => {
        dispatch({
          type: UPDATE_ITEM,
          item: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};
