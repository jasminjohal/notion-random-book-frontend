import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import Loading from "./Loading";

function App() {
  const [randomBook, setRandomBook] = useState("");
  const [loading, setLoading] = useState(false);
  const [genresList, setGenresList] = useState([]);
  const [genre, setGenre] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setRandomBook("");
    setLoading(true);
    if (genre === "Any") {
      fetch("/random-tbr-book")
        .then((res) => res.json())
        .then((data) => {
          setRandomBook(data);
          setLoading(false);
        });
    } else {
      fetch(`/random-tbr-book/${genre}`)
        .then((res) => res.json())
        .then((data) => {
          setRandomBook(data);
          setLoading(false);
        });
    }
  }

  function handleChange(e) {
    setGenre(e.target.value);
  }

  useEffect(() => {
    fetch("/tbr-genres")
      .then((response) => response.json())
      .then((data) => setGenresList(data.genres.sort()));
  }, []);

  return (
    <div className="App">
      <h1>Random Book Generator</h1>

      <form onSubmit={handleSubmit}>
        <label>Genre: </label>
        <select onChange={handleChange}>
          <option value="Any">Any</option>
          {genresList?.map((genre) => {
            return <option value={genre}>{genre}</option>;
          })}
        </select>
        <input type="submit" value="Submit" />
      </form>

      {randomBook || loading ? (
        <div id="random-book">
          {loading ? (
            <div class="loading-container">
              <Loading type="spin" color="black" />
            </div>
          ) : null}
          {randomBook ? (
            <div>
              <img src={randomBook.bookCover} alt="book cover" />
              <h2 className="book-title">{randomBook.title}</h2>
              <h4 className="book-author">{randomBook.author}</h4>
              <p>
                <span className="underline">Description</span>:{" "}
                {randomBook.description
                  ? randomBook.description
                  : "Not available."}
              </p>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default App;
