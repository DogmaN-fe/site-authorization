import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import CustomInput from "../CustomInput/CustomInput";
import { AppDispatch } from "../../utils/redux/store";
import { setUser } from "../../utils/redux/features/user-slice";
import { IFormData, IFormErrorMessage } from "../../utils/types";

import styles from "./LoginForm.module.sass";

/**
 * Форма для отправки данных для авторизации
 */
const LoginForm = () => {
  // Объект для хранения данных формы
  const [formData, setFormData] = useState<IFormData | null>(null);

  // Объект для хранения сообщений об ошибках
  const [formErrorMessage, setFormErrorMessage] =
    useState<IFormErrorMessage | null>(null);

  // Состояние для индикатора загрузки
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  /**
   * Отправка данных на сервер
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Включаем индикатор загрузки
    setIsLoading(true);

    // Пересенная для хранения информации об ошибках
    let hasError: boolean = false;

    // Проверка на пустое поле электронной почты
    if (!formData?.email) {
      setFormErrorMessage({
        ...formErrorMessage!,
        emailErrorMessage: "Почта не введена",
      });

      hasError = true;
    }
    // Проверка на пустое поле пароля
    if (!formData?.password) {
      setFormErrorMessage({
        ...formErrorMessage!,
        passwordErrorMessage: "Пароль не введен",
      });
      hasError = true;
    }

    // Если есть какие-то ошибки, то отменяем отправку данных
    if (hasError) {
      // Выключаем индикатор загрузки
      setIsLoading(false);
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
        if (!data.error) {
          // Сохраняем пользователя в Redux
          dispatch(setUser(data));
          // Переходим на страницу с карточками
          navigate("/cards");
        } else {
          setFormErrorMessage({
            ...formErrorMessage!,
            emailErrorMessage: "Неверный логин/пароль",
          });
        }
        // Выключаем индикатор загрузки
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Ошибка: " + error);
      });
  };

  /**
   * Функция-обработчик изменения полей ввода
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // Деструктурируем данные input'а (тип и значение)
    const { name, value } = e.target;

    // Очищаем информацию об ошибки определенного input
    setFormErrorMessage({ ...formErrorMessage!, [`${name}ErrorMessage`]: "" });

    // Обновляем состояние с данными формы
    setFormData({ ...formData!, [name]: value });
  };

  return (
    <section className={styles.login}>
      <form onSubmit={handleSubmit} className={styles.login__form}>
        <p className={styles.login__form_title}>Вход</p>
        <CustomInput
          type={"email"}
          name={"email"}
          text={"Электронная почта"}
          value={formData?.email || ""}
          handleChange={handleChange}
          placeholder={"example@mail.ru"}
          error={formErrorMessage?.emailErrorMessage}
        />
        <CustomInput
          type={"password"}
          name={"password"}
          text={"Пароль"}
          value={formData?.password || ""}
          handleChange={handleChange}
          placeholder={"******"}
          error={formErrorMessage?.passwordErrorMessage}
        />
        <button
          type="submit"
          className={styles.login__form_button}
          disabled={isLoading}
        >
          {isLoading ? "Загрузка..." : "Войти"}
        </button>
      </form>
    </section>
  );
};

export default LoginForm;
