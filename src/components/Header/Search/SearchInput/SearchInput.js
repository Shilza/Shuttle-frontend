import styles from "../search.module.css";
import React from "react";

const SearchInput = ({search, onBlur, onFocus, isPlaceholderVisible, searchRef}) => (
  <div className={styles.search}>
    <div className={styles.searchBox}>
      <input
        type='text'
        placeholder={isPlaceholderVisible && 'Search'}
        aria-label='Global search by users'
        onChange={search}
        ref={searchRef}
        onBlur={onBlur}
        onFocus={onFocus}
        maxLength={12}
      />
      <span/>
    </div>
  </div>
);

export default SearchInput;
