/*import React, { useState } from "react";
import { toast } from "react-hot-toast";
import css from "./SearchForm.module.css";

const SearchForm = ({ onSubmit }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    if (!searchTerm.trim()) {
      toast.error("Please enter a search term.");
      return;
    } else if (searchTerm.trim().length < 2) {
      toast.error("Search term should be at least two characters.");
      return;
    }
    onSubmit(searchTerm);
  };

  const handleFocus = () => {
    setSearchTerm("");
  };

  return (
    <form onSubmit={handleSubmit} className={css.search}>
      <input
        type="text"
        className={css.searchinput}
        value={searchTerm}
        onChange={event => setSearchTerm(event.target.value)}
        onFocus={handleFocus}
        autoComplete="off"
        autoFocus
        placeholder="Search your film"
      />
      <button className={css.searchbutton} type="submit">Search</button>
    </form>
  );
};

export default SearchForm;*/

import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import css from "./SearchForm.module.css";

const SearchForm = ({ onSubmit }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearchTerm = searchParams.get("query") || ""; // Отримання початкового значення з URL
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [wasCleared, setWasCleared] = useState(false); // Щоб стежити, чи інпут був очищений після фокуса

  useEffect(() => {
    setSearchTerm(initialSearchTerm); // Оновлення значення інпуту при зміні URL-параметрів
  }, [initialSearchTerm]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!searchTerm.trim()) {
      toast.error("Please enter a search term.");
      return;
    } else if (searchTerm.trim().length < 2) {
      toast.error("Search term should be at least two characters.");
      return;
    }
    setSearchParams({ query: searchTerm }); // Додавання пошукового запиту до URL
    onSubmit(searchTerm);
  };

  const handleFocus = () => {
    if (!wasCleared) {
      setSearchTerm(""); // Очищення інпуту при фокусі тільки один раз
      setWasCleared(true); // Встановлюємо флаг очищення
    }
  };

  return (
    <form onSubmit={handleSubmit} className={css.search}>
      <input
        type="text"
        className={css.searchinput}
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        onFocus={handleFocus}
        autoComplete="off"
        autoFocus
        placeholder="Search your film"
      />
      <button className={css.searchbutton} type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
