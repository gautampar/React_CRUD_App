import React from "react";

function SearchBar({  filterOnSearch, setFilterOnSearch }) {

  return (
    <div>
      <input
        type="email"
        className="form-control"
        value={filterOnSearch}
        onChange={(e) => setFilterOnSearch(e.target.value)}
        id="exampleFormControlInput1"
        placeholder="Search Book"
      />
    </div>
  );
}

export default SearchBar;
