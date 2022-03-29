import React from "react";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [randomBook, setRandomBook] = useState("");
  const [loading, setLoading] = useState(false);
  const [genresList, setGenresList] = useState([]);
  const [genre, setGenre] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setRandomBook("");
    setLoading(true);
    fetch(`/random/${genre}`)
      .then((res) => res.json())
      .then((data) => {
        setRandomBook(data);
        setLoading(false);
      });
  }

  function handleChange(e) {
    setGenre(e.target.value);
  }

  useEffect(() => {
    fetch("/genres")
      .then((response) => response.json())
      .then((data) => setGenresList(data.genres.sort()));
  }, []);

  return (
    <div className="App">
      {/* {data &&
        data.map((book) => {
          return <p>{book.title}</p>;
        })} */}
      <h1>Random Book</h1>
      <form onSubmit={handleSubmit}>
        <label>Genre:</label>
        <select onChange={handleChange}>
          {genresList?.map((genre) => {
            return <option value={genre}>{genre}</option>;
          })}
        </select>
        <input type="submit" value="Submit" />
      </form>
      <p>{loading ? "Loading..." : ""}</p>
      {randomBook && (
        <div>
          <img src={randomBook.bookCover} alt="book cover" />
          <p>{randomBook.title}</p>
          <p>{randomBook.author}</p>
          <p>
            Description:{" "}
            {randomBook.description ? randomBook.description : "Not available."}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
