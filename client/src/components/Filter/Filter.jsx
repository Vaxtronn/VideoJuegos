import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterGames, getGenres } from "../../redux/actions";
import "./Filter.css";

const Filter = () => {
  const [filter, setFilter] = useState({
    genresName: "",
    order: "",
  });

  const dispatch = useDispatch();

  const { genres, filterGame } = useSelector((state) => state);

  const handleChange = (e) => {
    e.preventDefault();
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    dispatch(filterGames(filter));
  };

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch, genres, filterGame]);
  return (
    <div className="select">
      <form onSubmit={handleSumbit}>
        <div>
          <label className="order-title">
            Order:
            <select
              name="order"
              className="select-order"
              onChange={handleChange}
              value={filter.order}
            >
              <option value="">--Order--</option>
              <option value="a-z">A-Z</option>
              <option value="z-a">Z-A</option>
              <option value="rating">Rating</option>
            </select>
          </label>

          <label>
            Genres:
            <select
              name="genresName"
              className="genresName"
              onChange={handleChange}
              value={filter.genresName}
            >
              <option value="">--Genres--</option>
              {genres.length &&
                genres.map((genre) => (
                  <option key={`OpD${genre.name}`} value={genre.name}>
                    {genre.name}
                  </option>
                ))}
            </select>
          </label>

          <button className="btn">Filter</button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
