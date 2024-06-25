import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ILike } from "../../types";

export const likeSlice = createSlice({
  name: "user",
  initialState: {
    likes: [] as ILike[],
  },
  reducers: {
    addLike: (state, action: PayloadAction<ILike>) => {
      // Добавление лайка
      state.likes.push(action.payload);

      // Сохранение лайков в локальном хранилище
      localStorage.setItem("likes", JSON.stringify(state.likes));
    },
    removeLike: (state, action: PayloadAction<ILike>) => {
      // Удаление лайка
      state.likes = state.likes.filter((el) => el.id !== action.payload.id);

      // Обновление лайков в локальном хранилище
      localStorage.setItem("likes", JSON.stringify(state.likes));
    },
    loadLikes: (state) => {
      // Получение лайков из локального хранилища
      const buffer = localStorage.getItem("likes"); 

      // Если лайки есть, то сохраняем их в сторе
      if (buffer) {
        state.likes = JSON.parse(buffer);
      }
    },
  },
});

export const { addLike, removeLike, loadLikes } = likeSlice.actions;
export default likeSlice.reducer;
