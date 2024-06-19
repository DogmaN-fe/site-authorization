import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import userSlice from "./features/user-slice"; // Импорт среза состояния пользователей
import likeSlice from "./features/like-slice"; // Импорт среза состояния лайков

// Конфигурация хранилища Redux
export const store = configureStore({
  reducer: {
    userSlice, // Редьюсер для обработки действий связанных с пользователями
    likeSlice, // Редьюсер для обработки действий связанных с лайками
  },
});

// Типизация состояния хранилища
export type RootState = ReturnType<typeof store.getState>;
// Типизация диспетчера хранилища
export type AppDispatch = typeof store.dispatch;

// Создание типизированного хука для использования в компонентах React
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
