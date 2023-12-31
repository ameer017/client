import React from "react";
import styles from "./Search.module.scss";
import { BiCurrentLocation, BiSearch } from "react-icons/bi";

const Search = ({ value, onChange }) => {
  return (
    <div className={styles.search}>
      <BiSearch size={18} className={styles.icon} />
      <input
        type="text"
        placeholder="Search for users"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export const SearchLocation = ({ value, onChange }) => {
  return (
    <div className={styles.search}>
      {/* <BiCurrentLocation size={18} className={styles.icon} /> */}
      <input
        type="text"
        placeholder="Search For location"
        value={value}
        onChange={onChange}
      />
      <button className="--btn --btn-primary">Search</button>
    </div>
  );
};

export default Search;
