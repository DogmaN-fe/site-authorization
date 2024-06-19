import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../utils/redux/features/user-slice";
import { AppDispatch } from "../../utils/redux/store";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.sass";
import CustomInput from "../CustomInput/CustomInput";

const LoginForm = () => {
  // Состояние для данных формы
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // Состояния для сообщений об ошибках
  const [emptyMail, setEmptyMail] = useState("");
  const [emptyPassword, setEmptyPassword] = useState("");
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

    // Проверка на пустое поле электронной почты
    if (!formData.email) {
      setEmptyMail("Почта не введена");
      setIsLoading(false); // Выключаем индикатор загрузки
      return;
    }
    // Проверка на пустое поле пароля
    if (!formData.password) {
      setEmptyPassword("Пароль не введен");
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
          setEmptyMail("Неверный логин/пароль");
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
      case "email":
        setEmptyMail("");
        break;
      case "password":
        setEmptyPassword("");
        break;
    }
    // Обновляем состояние с данными формы
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className={styles.login}>
      <form onSubmit={handleSubmit} className={styles.login__form}>
        <p className={styles.login__form_title}>Вход</p>
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
          error={emptyPassword}
        />
        <button
          type="submit"
          className={styles.login__form_button}
          disabled={isLoading}
        >
          {/* Текст кнопки изменяется в зависимости от состояния загрузки */}
          {isLoading ? "Загрузка..." : "Войти"}
        </button>
      </form>
    </section>
  );
};

export default LoginForm;
