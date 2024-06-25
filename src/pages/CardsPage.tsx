import { ReactElement, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import CardsPageHeader from "../components/CardsPageHeader/CardsPageHeader";
import EmployeeCard from "../components/EmployeeCard/EmployeeCard";
import { IEmployeeData } from "../utils/types";
import { AppDispatch } from "../utils/redux/store";
import { loadLikes } from "../utils/redux/features/like-slice";

import styles from "../sass/cardsPage.module.sass";
import arrow_down from "../assets/arrow-down.svg";

const CardsPage = (): ReactElement => {
  // Переменная для хранения карточек
  const [cards, setCards] = useState<IEmployeeData[] | []>([]);
  // Переменная для хранения страницы с карточками
  const [page, setPage] = useState(1);
  // Переменная для хранения полследней страницы с карточакми
  const [lastPage, setLastPage] = useState(null);
  // Переменная для отоброжения кнопки 'Показать еще'
  const [activeButton, setActiveButton] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    fetch(`https://reqres.in/api/users?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        const newCards: IEmployeeData[] | [] = [...cards, ...data.data];
        // Обновление состояния массивом карточек сотрудников
        setCards(newCards);
        // Сохраняем последнюю страницу карточек
        setLastPage(data.total_pages);
      });
  }, [page]);

  useEffect(() => {
    // Загружаем лайки для карточек
    dispatch(loadLikes());
  }, [dispatch]);

  const newCards = () => {
    // Если сраница полседння то деактивируем кнопку 'Показать еще'
    if (page === lastPage) {
      setActiveButton(true);
    } else {
      setPage(page + 1);
    }
  };

  return (
    <>
      <CardsPageHeader />
      <main className={styles.main}>
        <section className={styles.main__cards}>
          {cards?.map((card) => {
            return <EmployeeCard card={card} key={card.id} />;
          })}
        </section>
        <span className={styles.main__section_button}>
          <button
            className={`${styles.button} ${
              activeButton ? styles.button_hidden : ""
            }`}
            onClick={newCards}
          >
            <p className={styles.button__text}>Показать еще</p>
            <img src={arrow_down} alt="arrow down" />
          </button>
        </span>
      </main>
    </>
  );
};

export default CardsPage;
