import { Navigate } from "react-router-dom";
import { ReactElement } from "react";

const RequireAuth = ({ children }: { children: ReactElement }) => {
  // Проверка аутентификации пользователя
  const auth: boolean = localStorage.getItem("user") ? true : false;

  // Условие проверки аутентификации
  if (!auth) {
    return <Navigate to="/registration" replace />;
  }

  // Если пользователь аутентифицирован, рендеринг дочерних компонентов
  return children;
};

export default RequireAuth;
