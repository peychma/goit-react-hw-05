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

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import css from "./SearchForm.module.css";

const SearchForm = ({ onSubmit }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    const trimmedSearchTerm = searchTerm.trim();

    // Логування значення перед відправкою
    console.log("Search term before submitting:", trimmedSearchTerm);

    if (!trimmedSearchTerm) {
      toast.error("Please enter a search term.");
      return;
    } else if (trimmedSearchTerm.length < 2) {
      toast.error("Search term should be at least two characters.");
      return;
    }

    onSubmit(trimmedSearchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className={css.search}>
      <input
        type="text"
        className={css.searchinput}
        value={searchTerm}
        onChange={event => setSearchTerm(event.target.value)}
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
