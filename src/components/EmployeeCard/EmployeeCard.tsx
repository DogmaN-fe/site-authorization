import { Link } from "react-router-dom";
import { ILiked, IEmployeeData } from "../../utils/types";

import styles from "./employee-card.module.sass";
import like_d from "../../assets/like-d.svg"; // Иконка "не нравится"
import like_a from "../../assets/like-a.svg"; // Иконка "нравится"
import { useState } from "react"; // Хук состояния
import { useDispatch } from "react-redux"; // Хук для отправки действий в Redux
import { AppDispatch, useAppSelector } from "../../utils/redux/store"; // Типы и хук для доступа к состоянию Redux
import { addLike, removeLike } from "../../utils/redux/features/like-slice"; // Действия для обработки лайков

const EmployeeCard = ({ card }: { card: IEmployeeData }) => {
  // Получение состояния лайка из Redux
  const savedLike: boolean = useAppSelector((state) =>
    state.likeSlice.liked.some((item: ILiked) => item.id === card.id)
  );

  // Локальное состояние для отслеживания лайка
  const [isLiked, setLike] = useState(savedLike);

  // Диспетчер для отправки действий в Redux
  const dispatch = useDispatch<AppDispatch>();

  // Обработчик клика по кнопке лайка
  const handleClick = (e: any) => {
    e.preventDefault(); // Предотвращение стандартного поведения ссылки
    const newLikeValue = !isLiked; // Инвертирование состояния лайка
    setLike(newLikeValue); // Обновление локального состояния
    const saveLike: ILiked = { id: card.id, liked: newLikeValue }; // Создание объекта лайка
    if (!isLiked) {
      dispatch(addLike(saveLike)); // Добавление лайка в Redux
    } else {
      dispatch(removeLike(saveLike)); // Удаление лайка из Redux
    }
  };

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
          >
            <img src={isLiked ? like_a : like_d} alt="like" />
          </button>
        </article>
      </Link>
    </>
  );
};

export default EmployeeCard;
