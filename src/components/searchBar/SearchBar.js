import React, {useState} from 'react';
import './SearchBar.css';


function SearchBar({setLocationHandler}) {
    const [query, setQuery] = useState("");

    function handleClick () {
        setLocationHandler(query);
    }

    function keypressCheck(e) {
        if (e.keyCode === 13) {
            setLocationHandler(query);
        }
    }

    return (
    <span className="searchbar">
      <input
        type="text"
        name="search"
        placeholder="Zoek een stad in Nederland"
        value={query}
        onKeyDown={keypressCheck}
        onChange={(e)=> setQuery(e.target.value)}
      />

      <button type="button"
      onClick={handleClick}
      >
        Zoek
      </button>
    </span>
  );
};

export default SearchBar;
