import { Link } from "react-router-dom";

const NotUser = () => {
  return (
    <div>
      Пользователь не найден. <Link to={"/"}>На главную</Link>
    </div>
  );
};

export default NotUser;
