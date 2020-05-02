import React from "react";
import s from "./searchInput.module.css";

const SearchInput = ({search, onBlur, onFocus, searchRef}) => (
    <div className={s.searchBox}>
        <input
            type='text'
            placeholder='Search'
            aria-label='Global search by users'
            onChange={search}
            ref={searchRef}
            onBlur={onBlur}
            onFocus={onFocus}
            maxLength={12}
        />
        <span></span>
    </div>
);

export default SearchInput;
