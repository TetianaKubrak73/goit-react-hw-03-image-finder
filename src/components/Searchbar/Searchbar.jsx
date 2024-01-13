import { Component } from 'react';
import Notiflix from 'notiflix';
import style from './Searchbar.module.css';
export default class Searchbar extends Component {
  state = {
    searchQuery: ``,
  };

  handleQueryChange = ({ currentTarget: { value } }) => {
    this.setState({ searchQuery: value.toLowerCase() });
  };

  handleSubmit = e => {
    const searchQuery = this.state.searchQuery.trim();
    e.preventDefault();

    if (searchQuery.trim() === '') {
      Notiflix.Notify.info('Please, enter search word!');
      return;
    }

    this.props.onSubmit(searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <header className={style.searchBar}>
        <form className={style.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={style.searchFormButton}>
            <span className={style.searchFormButtonLabel}>Search</span>
          </button>
          <input
            className={style.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchQuery"
            value={searchQuery}
            onChange={this.handleQueryChange}
          />
        </form>
      </header>
    );
  }
}
