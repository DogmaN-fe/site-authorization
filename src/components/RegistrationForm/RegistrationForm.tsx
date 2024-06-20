import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../utils/redux/features/user-slice";
import { AppDispatch } from "../../utils/redux/store";
import { Link, useNavigate } from "react-router-dom";
import styles from "./RegistrationForm.module.sass";
import CustomInput from "../CustomInput/CustomInput";

const RegistrationForm = () => {
  // Состояние для данных формы
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    duplicatePassword: "",
  });
  // Состояния для сообщений об ошибках
  const [emptyMail, setEmptyMail] = useState("");
  const [emptyName, setEmptyName] = useState("");
  const [differentPassword, setDifferentPassword] = useState("");
  // Состояние для индикатора загрузки
  const [isLoading, setIsLoading] = useState(false);

  // Хук для отправки действий в Redux
  const dispatch = useDispatch<AppDispatch>();
  // Хук для навигации
  const navigate = useNavigate();

  // Обработчик отправки формы
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); // Включаем индикатор загрузки

    // Проверка на пустое поле имени
    if (!formData.name) {
      setEmptyName("Имя не введено");
      setIsLoading(false); // Выключаем индикатор загрузки
      return;
    }
    // Проверка на пустое поле электронной почты
    if (!formData.email) {
      setEmptyMail("Почта не введена");
      setIsLoading(false); // Выключаем индикатор загрузки
      return;
    }
    // Проверка на совпадение паролей
    if (formData.password !== formData.duplicatePassword) {
      setDifferentPassword("Пароли не совпадают");
      setIsLoading(false); // Выключаем индикатор загрузки
      return;
    }

    // Отправка запроса на сервер
    fetch("https://reqres.in/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data?.error) {
          dispatch(setUser(data)); // Сохраняем пользователя в Redux
          navigate("/cards"); // Переходим на страницу с карточками
        } else {
          setEmptyMail("Неверная почта");
        }
        setIsLoading(false); // Выключаем индикатор загрузки
      })
      .catch((error) => {
        console.log("Ошибка: " + error);
        setIsLoading(false); // Выключаем индикатор загрузки при ошибке
      });
  };

  // Обработчик изменения полей ввода
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Очищаем сообщения об ошибках при изменении содержимого полей
    switch (e.target.name) {
      case "name":
        setEmptyName("");
        break;
      case "email":
        setEmptyMail("");
        break;
      case "password":
        setDifferentPassword("");
        break;
      case "duplicatePassword":
        setDifferentPassword("");
        break;
    }
    // Обновляем состояние с данными формы
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className={styles.registration}>
      <form onSubmit={handleSubmit} className={styles.registration__form}>
        <p className={styles.registration__form_title}>Регистрация</p>
        <CustomInput
          type={"text"}
          name={"name"}
          text={"Имя"}
          value={formData.name}
          handleChange={handleChange}
          placeholder={"Имя"}
          error={emptyName}
        />
        <CustomInput
          type={"email"}
          name={"email"}
          text={"Электронная почта"}
          value={formData.email}
          handleChange={handleChange}
          placeholder={"example@mail.ru"}
          error={emptyMail}
        />
        <CustomInput
          type={"password"}
          name={"password"}
          text={"Пароль"}
          value={formData.password}
          handleChange={handleChange}
          placeholder={"******"}
          error={differentPassword}
        />
        <CustomInput
          type={"password"}
          name={"duplicatePassword"}
          text={"Подтвердите пароль"}
          value={formData.duplicatePassword}
          handleChange={handleChange}
          placeholder={"******"}
        />
        <button
          type="submit"
          className={styles.registration__form_button}
          disabled={isLoading}
        >
          {/* Текст кнопки изменяется в зависимости от состояния загрузки */}
          {isLoading ? "Загрузка..." : "Зарегистрироваться"}
        </button>
        {/* Ссылка на страницу входа для зарегестрированных пользователей */}
        <Link to={"/login"} className={styles.registration__form_login}>
          Уже зарегистрированы?
        </Link>
      </form>
    </section>
  );
};

export default RegistrationForm;
