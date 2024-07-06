import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { AppDispatch } from "../../utils/redux/store";
import { setUser } from "../../utils/redux/features/user-slice";
import { IFormData } from "../../utils/types";

import styles from "./LoginForm.module.sass";

/**
 * Форма для отправки данных для авторизации
 */
const LoginForm = () => {
  // Состояние для индикатора загрузки
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  // Работа с формой
  const { register, handleSubmit, formState, setError } = useForm<IFormData>({
    mode: "onChange",
  });

  /**
   * Отправка данных на сервер
   */
  const onSubmit = (formData: IFormData) => {
    // Включаем индикатор загрузки
    setIsLoading(true);

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
          // Сохраняем пользователя в стейт
          dispatch(setUser(data));
          // Переходим на страницу с карточками
          navigate("/cards");
        } else {
          setError("email", {
            message: "Неверная почта/пароль",
          });
        }
        // Выключаем индикатор загрузки
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Ошибка: " + error);
        setIsLoading(false);
      });
  };

  const emailError = formState.errors["email"]?.message;
  const passwordError = formState.errors["password"]?.message;

  return (
    <section className={styles.login}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.login__form}>
        <p className={styles.login__form_title}>Вход</p>
        <label className={styles.label}>
          <p className={styles.label__title}>{"Электронная почта"}</p>
          <input
            type={"email"}
            placeholder={"example@mail.ru"}
            {...register("email", {
              required: "Почта не введена",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Не правильная почта",
              },
            })}
            className={styles.label__input}
          />
          {emailError && <p className={styles.label__error}>{emailError}</p>}
        </label>
        <label className={styles.label}>
          <p className={styles.label__title}>{"Пароль"}</p>
          <input
            type={"password"}
            placeholder={"******"}
            {...register("password", {
              required: "Пароль не введен",
            })}
            className={styles.label__input}
          />
          {passwordError && (
            <p className={styles.label__error}>{passwordError}</p>
          )}
        </label>
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
