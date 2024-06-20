import styles from "./EmployeeHead.module.sass";
import CustomButton from "../CustomButton/CustomButton";
import exitImage from "../../assets/exit.svg";
import arrowImage from "../../assets/arrow.svg";
import { useCallback } from "react";
import { removeUser } from "../../utils/redux/features/user-slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { additionalInfo } from "../../utils/additional-info";
import { AppDispatch } from "../../utils/redux/store";

const EmployeeHead = ({
  avatar, // Ссылка на аватар
  first_name, // Имя сотрудника
  last_name, // Фамилия сотрудника
}: {
  avatar: string;
  first_name: string;
  last_name: string;
}) => {
  // Хук для отправки действий в Redux
  const dispatch = useDispatch<AppDispatch>();
  // Хук для навигации
  const navigate = useNavigate();

  // Функция для выхода из учетной записи
  const logOut = useCallback(() => {
    dispatch(removeUser()); // Удаляем пользователя из состояния Redux
    navigate("/registration"); // Перенаправляем на страницу регистрации
  }, [dispatch, navigate]);

  // Функция для возврата на предыдущую страницу
  const goBack = () => navigate(-1);

  return (
    <header className={styles.employee_head}>
      <nav className={styles.employee_head__buttons}>
        <CustomButton func={goBack} value="Назад" imageOnMob={arrowImage} />
        <CustomButton func={logOut} value="Выход" imageOnMob={exitImage} />
      </nav>
      <span className={styles.employee_head__info}>
        <img
          src={`${avatar}`}
          alt={first_name}
          className={styles.employee_head__info_image}
        />
        <div className={styles.employee_head__info_text}>
          <h3 className={styles.employee_head__info_text__name}>
            {first_name} {last_name}
          </h3>
          <p className={styles.employee_head__info_text__status}>
            {additionalInfo.status}
          </p>
        </div>
      </span>
    </header>
  );
};

export default EmployeeHead;
