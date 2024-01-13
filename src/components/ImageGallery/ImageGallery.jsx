import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import style from './ImageGallery.module.css';
const ImageGallery = ({ galleryItems }) => {
  return (
    <ul className={style.imageGallery}>
      {galleryItems.map(galleryItem => {
        return (
          <ImageGalleryItem key={galleryItem.id} galleryItem={galleryItem} />
        );
      })}
    </ul>
  );
};

export default ImageGallery;
