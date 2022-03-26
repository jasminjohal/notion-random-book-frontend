import React from "react";
import { useState } from "react";
import "./App.css";

function App() {
  const [randomBook, setRandomBook] = useState("");
  const [loading, setLoading] = useState(false);

  function handleClick() {
    setRandomBook("");
    setLoading(true);
    fetch("/random")
      .then((res) => res.json())
      .then((data) => {
        setRandomBook(data);
        setLoading(false);
      });
  }

  return (
    <div className="App">
      {/* {data &&
        data.map((book) => {
          return <p>{book.title}</p>;
        })} */}
      <h1>Random Book</h1>
      <button onClick={handleClick}>Generate</button>
      <p>{loading ? "Loading..." : ""}</p>
      {randomBook && (
        <div>
          <img src={randomBook.bookCover} alt="book cover" />
          <p>{randomBook.title}</p>
          <p>{randomBook.author}</p>
          <p>
            Description:{" "}
            {!randomBook ? "Retrieving book..." : randomBook.description}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
