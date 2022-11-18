// Importar las action types
import {
  GET_ALL_VIDEOGAMES,
  CREATE_VIDEOGAMES,
  LIST_GENRES,
  DETAIL_VIDEOGAME_ID,
  DETAIL_VIDEOGAME_NAME,
  RESET,
  VIEWGAMES,
  SUMPAGE,
  DECPAGE,
  UPDATEPAG
} from "../actions/const";

const initialState = {
  videogames: [],
  genres: [],
  searchVideoGame: [],
  searchVideoGameById: {},
  searchVideoGameByName: [],
  currentPage: 0,
  limitGames: 15,
  viewGames: [],
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
        videogames: action.payload,
      };
    case VIEWGAMES:
      let sum = [...state.videogames].slice(state.currentPage*state.limitGames, state.currentPage*state.limitGames+state.limitGames);
      return {
        ...state,
        viewGames: sum,
      };
    case DETAIL_VIDEOGAME_ID:
      return {
        ...state,
        searchVideoGameById: action.payload,
      };
    case SUMPAGE:
      return {
        ...state,
        currentPage: ++state.currentPage,
      };
    case DECPAGE:
      return {
        ...state,
        currentPage: --state.currentPage,
      };
    case UPDATEPAG:
      return {
        ...state,
        currentPage: Number(action.payload),
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
