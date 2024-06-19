import { Navigate } from "react-router-dom";
import { ReactElement } from "react";

const RequireAuth = ({ children }: { children: ReactElement }) => {
  // Проверка аутентификации пользователя
  const auth = localStorage.getItem("user") ? true : false; // Получение данных о пользователе из localStorage

  // Условие проверки аутентификации
  if (!auth) {
    // Если пользователь не аутентифицирован, перенаправление на страницу регистрации
    return <Navigate to="/registration" replace />;
  }

  // Если пользователь аутентифицирован, рендеринг дочерних компонентов
  return children;
};

export default RequireAuth;
