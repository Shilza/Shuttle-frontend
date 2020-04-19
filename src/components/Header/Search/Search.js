import React, {useEffect, useRef, useState} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import {useSearch} from "hooks";
import SearchBar from './SearchBar';
import SearchInput from "./SearchInput";

import styles from './search.module.css';


const Search = ({dispatch, isSearchFocused}) => {

  let [isBarVisible, setBarIsVisible] = useState(false);
  const [fetcher, setFetcher] = useState(null);
  const {users, search, resetSearch} = useSearch();

  let searchRef = useRef();

  useEffect(() => {
    if (isSearchFocused)
      searchRef.current.focus();
  }, [isSearchFocused]);

  const onChangeSearch = event => {
    setBarIsVisible(true);
    dispatch.searchUi.setIsSearchFocused(true);

    const username = event.target.value;
    if (username.length > 0)
      setFetcher(() => (page) => search(username, page));
    else {
      resetSearch();
      setFetcher(null);
    }
  };

  const makeBarInvisible = event => {
    setBarIsVisible(false);
    closeSearchInput();
    searchRef.current.value = '';
    resetSearch();
  };

  const closeSearchInput = () => {
    searchRef.current.value = '';
    dispatch.searchUi.setIsSearchFocused(false);
  };

  const openSearchInput = () => {
    dispatch.searchUi.setIsSearchFocused(true);
  };

  const closeBar = () => {
    setBarIsVisible(false);
  };

  return (
    <div className={styles.container} aria-label='Global search'>
      <SearchInput
        search={onChangeSearch}
        searchRef={searchRef}
        onBlur={closeSearchInput}
        onFocus={openSearchInput}
      />
      {
        isBarVisible &&
        <SearchBar
          makeBarInvisible={makeBarInvisible}
          closeBar={closeBar}
          fetcher={fetcher}
          users={users}
        />
      }
    </div>
  );
};

SearchInput.propTypes = {
  search: PropTypes.func.isRequired
};

Search.propTypes = {
  isSearchFocused: PropTypes.bool.isRequired
};

export default connect((state) => ({
  isSearchFocused: state.searchUi.isSearchFocused
}))(Search);
