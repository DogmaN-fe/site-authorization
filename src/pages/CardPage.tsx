import { useEffect, useState } from "react"; // Импорт хуков useEffect и useState
import { useParams } from "react-router-dom"; // Импорт хука useParams для получения параметров маршрута
import { IEmployeeData } from "../utils/types"; // Импорт типа данных пользователя
import NotUser from "../components/NotUser/NotUser"; // Импорт компонента NotUser
import Employee from "../components/Employee/Employee"; // Импорт компонента Employee

// Компонент страницы карточки пользователя
const CardPage = () => {
  const { id } = useParams(); // Получение id из параметров маршрута
  const [card, setCard] = useState<IEmployeeData | null>(null); // Состояние для хранения данных карточки пользователя

  // Хук useEffect для загрузки данных пользователя
  useEffect(() => {
    fetch(`https://reqres.in/api/users/${id}`) // Запрос к API для получения данных пользователя
      .then((res) => res.json()) // Преобразование ответа в JSON
      .then((data) => setCard(data.data)); // Обновление состояния карточки данными пользователя
  }, [id]); // Зависимость от id для повторного выполнения при его изменении

  // Условный рендеринг: если данные карточки отсутствуют, показываем NotUser, иначе Employee
  return !card ? <NotUser /> : <Employee user={card} />;
};

export default CardPage;
