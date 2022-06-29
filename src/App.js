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
    // user didn't select a specific genre
    if (genre === "Any") {
      fetch("/random-tbr-book")
        .then((res) => res.json())
        .then((data) => {
          setRandomBook(data);
          setLoading(false);
        });
      // user selected a genre from dropdown
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

  // update genres dropdown whenever it changes
  useEffect(() => {
    fetch("/tbr-genres")
      .then((response) => response.json())
      .then((data) => setGenresList(data.genres.sort()));
  }, []);

  return (
    <div className="App">
      <h1>Random Book Generator</h1>

      {/* form where user can select from a list of genres */}
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
              <br></br>
              <p>
                <span className="underline">Owned</span>:{" "}
                {randomBook.ownedFormats.length > 0
                  ? randomBook.ownedFormats?.map((ownedFormat) => {
                      return <ul>{ownedFormat}</ul>;
                    })
                  : "Not owned."}
              </p>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default App;
