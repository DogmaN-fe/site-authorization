import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { ILike, IEmployeeData } from "../../utils/types";
import { AppDispatch, useAppSelector } from "../../utils/redux/store";
import { addLike, removeLike } from "../../utils/redux/features/like-slice";

import styles from "./employee-card.module.sass";
import like_d from "../../assets/like-d.svg"; // Иконка "не нравится"
import like_a from "../../assets/like-a.svg"; // Иконка "нравится"

const EmployeeCard = ({ card }: { card: IEmployeeData }) => {
  // Получение состояния лайка из Redux
  const savedLike: boolean = useAppSelector((state) =>
    state.likeSlice.likes.some((item: ILike) => item.id === card.id)
  );

  // Переменная для отслеживания лайка
  const [isLiked, setLike] = useState(savedLike);

  const dispatch = useDispatch<AppDispatch>();

  /**
   * Функция-обработчик клика по кнопке лайка
   */
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault(); // Предотвращение стандартного поведения ссылки

      // Инвертирование состояния лайка
      const newLikeValue = !isLiked;

      // Обновление локального состояния
      setLike(newLikeValue);

      // Создание объекта лайка
      const saveLike: ILike = { id: card.id, like: newLikeValue };

      if (!isLiked) {
        dispatch(addLike(saveLike)); // Добавление лайка в Redux
      } else {
        dispatch(removeLike(saveLike)); // Удаление лайка из Redux
      }
    },
    [card.id, dispatch, isLiked]
  );

  return (
    <>
      <Link to={`/cards/${card.id}`} className={styles.link}>
        <article className={styles.user_card}>
          <img
            src={`${card?.avatar}`}
            alt={card?.first_name}
            className={styles.user_card__avatar}
          />
          <h3 className={styles.user_card__info}>
            {card?.first_name} {card?.last_name}
          </h3>
          <button
            className={styles.user_card__like_button}
            onClick={handleClick}
            aria-label={isLiked ? "Не нравится" : "Нравится"}
          >
            <img src={isLiked ? like_a : like_d} alt="like" />
          </button>
        </article>
      </Link>
    </>
  );
};

export default EmployeeCard;
