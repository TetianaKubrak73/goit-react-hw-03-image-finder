import { Component } from 'react';
import style from './Modal.module.css';
export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleBackdropClick = ({ target, currentTarget }) => {
    if (currentTarget === target) {
      this.props.onCloseModal();
    }
  };

  render() {
    const { largeImageURL, alt } = this.props;

    return (
      <div className={style.overlay} onClick={this.handleBackdropClick}>
        <div className={style.modal}>
          <img src={largeImageURL} alt={alt} />
        </div>
      </div>
    );
  }
}
