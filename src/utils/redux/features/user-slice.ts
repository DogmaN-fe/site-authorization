import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAnswer } from "../../types"; // Импорт типа IAnswer из определений типов

// Создание среза состояния для пользователя
export const userSlice = createSlice({
  name: "user", // Название среза
  initialState: {
    user: {
      token: "", // Начальное значение токена
      id: "", // Начальное значение ID пользователя
    } as IAnswer, // Приведение типа начального состояния к типу IAnswer
  },
  reducers: {
    // Установка данных пользователя
    setUser: (state, action: PayloadAction<IAnswer>) => {
      state.user.token = action.payload.token; // Обновление токена пользователя
      state.user.id = action.payload.id; // Обновление ID пользователя

      localStorage.setItem("user", JSON.stringify(action.payload)); // Сохранение данных пользователя в локальное хранилище
    },
    // Удаление данных пользователя
    removeUser: (state) => {
      state.user.id = ""; // Очистка ID пользователя
      state.user.token = ""; // Очистка токена пользователя

      localStorage.removeItem("user"); // Удаление данных пользователя из локального хранилища
    },
  },
});

export const { setUser, removeUser } = userSlice.actions; // Экспорт действий среза
export default userSlice.reducer; // Экспорт редьюсера среза
