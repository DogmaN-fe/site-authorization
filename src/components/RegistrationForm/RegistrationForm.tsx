import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import CustomInput from "../CustomInput/CustomInput";
import { AppDispatch } from "../../utils/redux/store";
import { setUser } from "../../utils/redux/features/user-slice";
import { IFormData } from "../../utils/types";

import styles from "./RegistrationForm.module.sass";
import { useForm } from "react-hook-form";
import React from "react";

const RegistrationForm = () => {
  // Состояние для индикатора загрузки
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Работа с формой
  const { register, handleSubmit, formState, setError, watch } =
    useForm<IFormData>({
      mode: "onChange",
    });

  const password = React.useRef({});
  password.current = watch("password", "");

  const nameError = formState.errors["name"]?.message;
  const emailError = formState.errors["email"]?.message;
  const duplicatePasswordError = formState.errors["duplicatePassword"]?.message;

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
      })
      .catch((error) => {
        console.log("Ошибка: " + error);
      })
      .finally(() => {
        // Выключаем индикатор загрузки
        setIsLoading(false);
      });
  };

  return (
    <section className={styles.registration}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.registration__form}
      >
        <p className={styles.registration__form_title}>Регистрация</p>

        {/** label of name */}
        <label className={styles.label}>
          <p className={styles.label__title}>{"Имя"}</p>
          <input
            type={"text"}
            placeholder={"Иван Иванов"}
            {...register("name", {
              required: "Имя не введено",
            })}
            className={styles.label__input}
          />
          {nameError && <p className={styles.label__error}>{nameError}</p>}
        </label>

        {/** label of email */}
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

        {/** label of password */}
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
        </label>

        {/** label of confirm password */}
        <label>
          <p className={styles.label__title}>{"Пароль"}</p>
          <input
            type={"password"}
            placeholder={"******"}
            {...register("duplicatePassword", {
              validate: (value) => {
                return value === password.current || "Пароли не совпадают";
              },
            })}
            className={styles.label__input}
          />
          {duplicatePasswordError && (
            <p className={styles.label__error}>{duplicatePasswordError}</p>
          )}
        </label>

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
