// Importar las action types
import {
  GET_ALL_VIDEOGAMES,
  CREATE_VIDEOGAMES,
  LIST_GENRES,
  DETAIL_VIDEOGAME_ID,
  DETAIL_VIDEOGAME_NAME,
  VIEWGAMES,
  SUMPAGE,
  DECPAGE,
  UPDATEPAG,
  FILTER_GAMES,
} from "../actions/const";

const initialState = {
  videogames: [],
  genres: [],
  searchVideoGameById: {},
  filterGame: [],
  currentPage: 0,
  limitGames: 15,
  viewGames: [],
  createVideoGame: null,
  reset: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        filterGame: action.payload,
      };

    case DETAIL_VIDEOGAME_NAME:
      return {
        ...state,
        videogames: action.payload,
        filterGame: action.payload,
      };

    case VIEWGAMES:
      let sum = state.filterGame.slice(
        state.currentPage * state.limitGames,
        state.currentPage * state.limitGames + state.limitGames
      );
      return {
        ...state,
        viewGames: sum,
      };

    case DETAIL_VIDEOGAME_ID:
      return {
        ...state,
        searchVideoGameById: action.payload
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

    case FILTER_GAMES:
      let { genresName, order } = action.payload;
      let copyState = {
        ...state,
        currentPage: 0,
      };

      if (genresName) {
        let filterGenre = [...state.videogames].filter((genre) =>
          genre.genres.includes(genresName)
        );
        copyState = {
          ...copyState,
          filterGame: filterGenre,
        };
      } else {
        copyState = {
          ...copyState,
          filterGame: [...state.videogames],
        };
      }

      if (order) {
        if (order === "rating") {
          let organize = [...copyState.videogames].sort(
            (a, b) => b.rating - a.rating
          );
          copyState = {
            ...copyState,
            filterGame: organize,
          };
        } else {
          let organize = [...copyState.filterGame].sort((a, b) =>
            a.name > b.name ? 1 : -1
          );
          if (order === "z-a") organize = organize.reverse();
          copyState = {
            ...copyState,
            filterGame: organize,
          };
        }
      }
      return copyState;

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

    default:
      return state;
  }
};

export default rootReducer;
