import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IEmployeeData } from "../utils/types";
import NotUser from "../components/NotUser/NotUser";
import Employee from "../components/Employee/Employee";

const CardPage = () => {
  // Получение id из параметров маршрута
  const { id } = useParams();
  // Переменная для хранения карточки сотрудника
  const [card, setCard] = useState<IEmployeeData | null>(null);

  useEffect(() => {
    fetch(`https://reqres.in/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => setCard(data.data));
  }, [id]);

  // Условный рендеринг: если данные карточки отсутствуют, показываем NotUser, иначе Employee
  return !card ? <NotUser /> : <Employee user={card} />;
};

export default CardPage;
