import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import CustomInput from "../CustomInput/CustomInput";
import { AppDispatch } from "../../utils/redux/store";
import { setUser } from "../../utils/redux/features/user-slice";
import { IFormData, IFormErrorMessage } from "../../utils/types";

import styles from "./RegistrationForm.module.sass";

const RegistrationForm = () => {
  // Состояние для данных формы
  const [formData, setFormData] = useState<IFormData | null>(null);

  // Объект для хранения сообщений об ошибках
  const [formErrorMessage, setFormErrorMessage] =
    useState<IFormErrorMessage | null>(null);

  // Состояние для индикатора загрузки
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Обработчик отправки формы
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Включаем индикатор загрузки
    setIsLoading(true);

    // Пересенная для хранения информации об ошибках
    let hasError: boolean = false;

    // Проверка на пустое поле имени
    if (!formData?.name) {
      setFormErrorMessage({
        ...formErrorMessage!,
        nameErrorMessage: "Имя не введено",
      });

      hasError = true;
    }
    // Проверка на пустое поле электронной почты
    if (!formData?.email) {
      setFormErrorMessage({
        ...formErrorMessage!,
        emailErrorMessage: "Почта не введена",
      });

      hasError = true;
    }
    // Проверка на совпадение паролей
    if (formData?.password !== formData?.duplicatePassword) {
      setFormErrorMessage({
        ...formErrorMessage!,
        passwordErrorMessage: "Пароли не совпадают",
      });
      hasError = true;
    }

    // Если есть какие-то ошибки, то отменяем отправку данных
    if (hasError) {
      // Выключаем индикатор загрузки
      setIsLoading(false);
      console.log("false");

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
        // Сохраняем пользователя в store
        dispatch(setUser(data));
        // Переходим на страницу с карточками
        navigate("/cards");
      })
      .catch((error) => {
        console.log("Ошибка: " + error);
      })
      .finally(() => {
        // Выключаем индикатор загрузки
        setIsLoading(false);
      });
  };

  /**
   * Функция-обработчик изменения полей ввода
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Деструктурируем данные input'а (тип и значение)
    const { name, value } = e.target;

    // Очищаем информацию об ошибки определенного input
    setFormErrorMessage({ ...formErrorMessage!, [`${name}ErrorMessage`]: "" });

    // Обновляем состояние с данными формы
    setFormData({ ...formData!, [name]: value });
  };

  return (
    <section className={styles.registration}>
      <form onSubmit={handleSubmit} className={styles.registration__form}>
        <p className={styles.registration__form_title}>Регистрация</p>
        <CustomInput
          type={"text"}
          name={"name"}
          text={"Имя"}
          value={formData?.name || ""}
          handleChange={handleChange}
          placeholder={"Имя"}
          error={formErrorMessage?.nameErrorMessage}
        />
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
        <CustomInput
          type={"password"}
          name={"duplicatePassword"}
          text={"Подтвердите пароль"}
          value={formData?.duplicatePassword || ""}
          handleChange={handleChange}
          placeholder={"******"}
        />
        <button
          type="submit"
          className={styles.registration__form_button}
          disabled={isLoading}
        >
          {isLoading ? "Загрузка..." : "Зарегистрироваться"}
        </button>
        <Link to={"/login"} className={styles.registration__form_login}>
          Уже зарегистрированы?
        </Link>
      </form>
    </section>
  );
};

export default RegistrationForm;
