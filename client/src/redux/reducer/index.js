// Importar las action types
import {
  GET_ALL_VIDEOGAMES,
  CREATE_VIDEOGAMES,
  LIST_GENRES,
  DETAIL_VIDEOGAME_ID,
  DETAIL_VIDEOGAME_NAME,
  RESET
} from "../actions/const";

const initialState = {
  videogames: [],
  genres: [],
  searchVideoGame: [],
  searchVideoGameById: {},
  searchVideoGameByName: [],
  createVideoGame: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
      };
    case DETAIL_VIDEOGAME_NAME:
      return {
        ...state,
        searchVideoGameByName: action.payload,
      };
    case DETAIL_VIDEOGAME_ID:
      return {
        ...state,
        searchVideoGameById: action.payload,
      };
    case LIST_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case CREATE_VIDEOGAMES:
      return {
        ...state,
        createVideoGame: action.payload,
      };
    case RESET:
      return {
        ...state,
        videogames: [],
      };
    default:
      return state;
  }
};

export default rootReducer;
