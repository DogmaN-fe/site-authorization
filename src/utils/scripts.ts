import { NavigateFunction } from "react-router-dom";
import { removeUser } from "./redux/features/user-slice";
import { AppDispatch } from "./redux/store";

  /**
   *  Функция для выхода из учетной записи
   */
 export const logOut = (dispatch: AppDispatch, navigate: NavigateFunction) => {
    // Удаляем пользователя из состояния Redux
    dispatch(removeUser());
    // Перенаправляем на страницу регистрации
    navigate("/registration");
  };