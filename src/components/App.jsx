import { Component } from 'react';
import PostsApiService from '../Api/PostApiService';
import Notiflix from 'notiflix';
import style from './App.module.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { Loader } from './Loader/Loader';
const postApiService = new PostsApiService();

export class App extends Component {
  state = {
    searchQuery: ``,
    galleryItems: [],
    galleryPage: 1,

    loading: false,
    isButtonShow: false,
    error: true,
  };

  componentDidUpdate(_, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;
    const prevPage = prevState.galleryPage;
    const nextPage = this.state.galleryPage;

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      this.fetchGalleryItems(nextQuery, nextPage);
    }
  }

  fetchGalleryItems = (nextQuery, nextPage) => {
    this.setState({ loading: true, error: false });

    postApiService.query = nextQuery;
    postApiService.page = nextPage;

    try {
      postApiService.fetchPost().then(data => {
        postApiService.hits = data.totalHits;

        const newData = data.hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          })
        );
        const currentData = [...this.state.galleryItems, ...newData];

        this.setState(prevState => ({
          galleryItems: [...prevState.galleryItems, ...newData],
        }));

        if (!data.totalHits) {
          this.setState({ loading: false, error: true });
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }

        if (currentData.length >= data.totalHits) {
          this.setState({
            loading: false,
            isButtonShow: false,
            error: false,
          });
          return;
        }

        if (nextPage === 1) {
          Notiflix.Notify.success(
            `Hooray! We found ${postApiService.hits} images.`
          );
        }

        this.setState({
          loading: false,
          isButtonShow: true,
          error: false,
        });
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({ loading: false, error: true });
      Notiflix.Notify.failure(
        'An error occurred while fetching data. Please try again.'
      );
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  handleFormSubmit = searchQuery => {
    this.setState({
      searchQuery,
      galleryPage: 1,
      galleryItems: [],
      isButtonShow: false,
    });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      galleryPage: prevState.galleryPage + 1,
    }));
  };

  render() {
    const { galleryItems, loading, isButtonShow, error } = this.state;

    return (
      <div className={style.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {error && <h2>Please, enter search word!</h2>}
        {!error && <ImageGallery galleryItems={galleryItems} />}
        {loading && <Loader />}
        {isButtonShow && <Button onClick={this.onLoadMore} />}
      </div>
    );
  }
}
