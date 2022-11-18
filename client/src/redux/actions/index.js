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
} from "./const.js";

export const gettAllVideoGames = () => {
  return async (dispatch) => {
    const detail = await fetch(`http://localhost:3001/videogames`).then((res) =>
      res.json()
    );
    dispatch({
      type: GET_ALL_VIDEOGAMES,
      payload: detail,
    });
  };
};

export const gettVideoGameByName = (name) => {
  return async (dispatch) => {
    const GamebyName = await fetch(
      `http://localhost:3001/videogames?search=${name}`
    ).then((res) => res.json());
    console.log(name);
    console.log("Estoy en la accion");
    console.log(GamebyName);
    dispatch({
      type: DETAIL_VIDEOGAME_NAME,
      payload: GamebyName,
    });
  };
};

export const gettVideoGameById = (id) => {
  return async (dispatch) => {
    const GamebyId = await fetch(`http://localhost:3001/videogames/${id}`).then(
      (res) => res.json()
    );
    dispatch({
      type: DETAIL_VIDEOGAME_ID,
      payload: GamebyId,
    });
  };
};

export const createVideoGames = (obj) => {
  return async (dispatch) => {
    const newGame = await fetch(`http://localhost:3001/videogames`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    }).then((res) => res.json());
    dispatch({
      type: CREATE_VIDEOGAMES,
      payload: newGame,
    });
  };
};

export const getGenres = () => {
  return async (dispatch) => {
    const genres = await fetch(`http://localhost:3001/genres`).then((res) =>
      res.json()
    );
    dispatch({
      type: LIST_GENRES,
      payload: genres,
    });
  };
};

export const resetAll = () => {
  return (dispatch) => {
    dispatch({
      type: RESET,
    })
  }
}
export const getViewGames = () => {
  return {
      type: VIEWGAMES,
  }
}

export const sumPage = () => {
  return {
      type: SUMPAGE,
  }
}

export const decPage = () => {
  return {
      type: DECPAGE,
  }
}

export const updatePage = (num) => {
  return {
      type: UPDATEPAG,
      payload: num
  }
}
