import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAnswer } from "../../types";

export const userSlice = createSlice({
  name: "user", // Название среза
  initialState: {
    user: {
      token: "", 
    } as IAnswer,
  },
  reducers: {
    setUser: (state, action: PayloadAction<IAnswer>) => {
      state.user.token = action.payload.token;
      
      // Так же сохраняем айди, если это авторизация пользователя
      state.user.id = action.payload.id;

      // Сохранение данных пользователя в локальное хранилище
      localStorage.setItem("user", JSON.stringify(action.payload)); 
    },
    removeUser: (state) => {
      state.user.id = ""; 
      state.user.token = "";

      // Удаление данных пользователя из локального хранилища
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
