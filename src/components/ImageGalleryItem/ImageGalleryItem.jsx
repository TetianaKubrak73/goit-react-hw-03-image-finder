import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';
import style from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  toggleModal = () => {
    this.setState(({ isModalOpen }) => ({ isModalOpen: !isModalOpen }));
  };

  render() {
    const {
      galleryItem: { webformatURL, largeImageURL, tags },
    } = this.props;

    return (
      <>
        <li className={style.imageGalleryItem} onClick={this.toggleModal}>
          <img
            className={style.imageGalleryItemImage}
            src={webformatURL}
            alt={tags}
          />
        </li>
        {this.state.isModalOpen && (
          <Modal
            largeImageURL={largeImageURL}
            alt={tags}
            onCloseModal={this.toggleModal}
          />
        )}
      </>
    );
  }
}
