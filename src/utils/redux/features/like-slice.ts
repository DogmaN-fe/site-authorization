import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ILiked } from "../../types"; // Импорт типа ILiked

// Создание среза состояния для лайков
export const likeSlice = createSlice({
  name: "user", // Название среза
  initialState: {
    liked: [] as ILiked[], // Начальное состояние - пустой массив лайков
  },
  reducers: {
    // Добавление лайка
    addLike: (state, action: PayloadAction<ILiked>) => {
      state.liked.push(action.payload); // Добавление лайка в состояние

      localStorage.setItem("likes", JSON.stringify(state.liked)); // Сохранение лайков в локальном хранилище
    },
    // Удаление лайка
    removeLike: (state, action: PayloadAction<ILiked>) => {
      state.liked = state.liked.filter((el) => el.id !== action.payload.id); // Удаление лайка из состояния

      localStorage.setItem("likes", JSON.stringify(state.liked)); // Обновление лайков в локальном хранилище
    },
    // Загрузка лайков
    loadLikes: (state) => {
      const buffer = localStorage.getItem("likes"); // Получение лайков из локального хранилища
      if (buffer) {
        state.liked = JSON.parse(buffer); // Парсинг и обновление состояния лайками
      }
    },
  },
});

// Экспорт действий среза
export const { addLike, removeLike, loadLikes } = likeSlice.actions;
export default likeSlice.reducer; // Экспорт редьюсера среза
