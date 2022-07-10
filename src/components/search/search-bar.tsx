import { useState, useCallback } from 'react';
import classnames from 'classnames';
import { debounce } from 'lodash';
import { Svg } from '../svg/svg';

import styles from './search-bar.module.scss';

export interface SearchBarProps {
  searchSongs: (term: string) => Promise<void>;
}

const SearchBar = (props: SearchBarProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(null);
  const { searchSongs } = props;
  const [currentValue, setCurrentValue] = useState<string>();

  const handleOnValueChange = useCallback(
    debounce(async (value: string) => {
      if (!value || value.trim().length === 0) {
        setIsLoading(false);
        return;
      }
      await searchSongs(value);
      setIsLoading(false);
    }, 250),
    []
  );

  return (
    <div className={styles.searchBar}>
      {isLoading ? <i className={styles.loading} /> : <Svg name="search" className={styles.searchIcon} />}
      <input
        type="text"
        value={currentValue || ''}
        placeholder="Search for song"
        className={classnames(styles.searchBarInput)}
        onChange={(event) => {
          const { value } = event.target;
          setIsLoading(true);
          setCurrentValue(value);
          handleOnValueChange(value);
        }}
        onFocus={(event) => {
          const { value } = event.target;
          if (value) {
            setCurrentValue(value);
            handleOnValueChange(value);
          }
        }}
        onClick={() => {}}
      />
    </div>
  );
};

export default SearchBar;
