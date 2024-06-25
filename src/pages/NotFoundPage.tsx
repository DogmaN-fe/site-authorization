import { ReactElement } from "react";
import { Link } from "react-router-dom";

const NotFoundPage = (): ReactElement => {
  return (
    <div>
      Страница не найден. <Link to={"/"}>На главную</Link>
    </div>
  );
};

export default NotFoundPage;
