import style from './Button.module.css';
const Button = ({ onClick }) => {
  return (
    <button className={style.buttonLoad} type="button" onClick={onClick}>
      Load More
    </button>
  );
};
export default Button;
