import { useEffect, useState } from "react"; // Импорт хуков useEffect и useState для работы с жизненным циклом и состоянием
import { IApiResponse, IEmployeeData } from "../utils/types"; // Импорт типов IApiResponse и IUserData
import CardsPageHeader from "../components/CardsPageHeader/CardsPageHeader"; // Импорт компонента заголовка страницы карточек
import EmployeeCard from "../components/EmployeeCard/EmployeeCard"; // Импорт компонента карточки сотрудника
import styles from "../sass/cardsPage.module.sass"; // Импорт стилей для страницы карточек
import { useDispatch } from "react-redux"; // Импорт хука useDispatch для работы с Redux
import { AppDispatch } from "../utils/redux/store"; // Импорт типа AppDispatch из хранилища Redux
import { loadLikes } from "../utils/redux/features/like-slice"; // Импорт действия loadLikes из среза лайков

const CardsPage = () => {
  const [cards, setCards] = useState<IEmployeeData[] | []>([]); // Состояние для хранения массива карточек сотрудников

  const dispatch = useDispatch<AppDispatch>(); // Инициализация диспетчера Redux

  // Хук useEffect для загрузки данных о сотрудниках
  useEffect(() => {
    fetch(`https://reqres.in/api/users`) // Запрос к API для получения списка сотрудников
      .then((res) => res.json()) // Преобразование ответа в JSON
      .then((data: IApiResponse) => {
        return setCards(data.data); // Обновление состояния массивом карточек сотрудников
      });
  }, []);

  // Хук useEffect для загрузки лайков
  useEffect(() => {
    dispatch(loadLikes()); // Вызов действия loadLikes для загрузки лайков
  }, [dispatch]); // Зависимость от dispatch для повторного выполнения при его изменении

  return (
    <>
      <CardsPageHeader /> {/* Рендеринг заголовка страницы */}
      <section className={styles.cards}>
        {/* Раздел для отображения карточек сотрудников */}
        {cards?.map((card) => {
          // Итерация по массиву карточек сотрудников
          return <EmployeeCard card={card} key={card.id} />; // Рендеринг карточки сотрудника
        })}
      </section>
    </>
  );
};

export default CardsPage;
