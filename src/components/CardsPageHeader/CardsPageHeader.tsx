import CustomButton from "../CustomButton/CustomButton"; // Импорт компонента кнопки
import { useDispatch } from "react-redux"; // Импорт хука для отправки действий в хранилище
import { AppDispatch } from "../../utils/redux/store"; // Тип диспетчера из хранилища
import { removeUser } from "../../utils/redux/features/user-slice"; // Действие для удаления пользователя
import { useNavigate } from "react-router-dom"; // Хук для навигации

import exitImage from "../../assets/exit.svg"; // Изображение для кнопки выхода
import styles from "./CardsPageHeader.module.sass"; // Стили для компонента заголовка страницы

// Компонент заголовка страницы с карточками
const CardsPageHeader = () => {
  const dispatch = useDispatch<AppDispatch>(); // Инициализация диспетчера
  const navigate = useNavigate(); // Инициализация функции навигации

  // Обработчик отправки формы
  const handleSubmit = () => {
    dispatch(removeUser()); // Вызов действия для удаления пользователя
    navigate("/registration"); // Перенаправление на страницу регистрации
  };

  return (
    <header className={styles.cards_page_header}>
      <span className={styles.cards_page_header__possiton_button}>
        <CustomButton
          func={handleSubmit} // Привязка обработчика к кнопке
          value="Выход" // Текст кнопки
          imageOnMob={exitImage} // Изображение для мобильной версии
        />
      </span>
      <div className={styles.cards_page_header__info}>
        <h1 className={styles.cards_page_header__info_title}>Наша команда</h1>
        <h2 className={styles.cards_page_header__info_description}>
          Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые
          ложатся на их плечи, и умеющие находить выход из любых, даже самых
          сложных ситуаций.
        </h2>
      </div>
    </header>
  );
};

export default CardsPageHeader;
