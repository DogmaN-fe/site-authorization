import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import CustomButton from "../../CustomButton/CustomButton";
import exitImage from "../../../assets/exit.svg";
import arrowImage from "../../../assets/arrow.svg";
import { additionalInfo } from "../../../utils/additional-info";
import { AppDispatch } from "../../../utils/redux/store";

import styles from "./EmployeeHead.module.sass";
import { ReactElement, useCallback } from "react";
import { logOut } from "../../../utils/scripts";

/**
 * Шапка странички сотрудника
 * @param avatar Ссылка на аватар
 * @param first_name Имя сотрудника
 * @param last_name Фамилия сотрудника
 * @returns
 */
const EmployeeHead = ({
  avatar,
  first_name,
  last_name,
}: {
  avatar: string;
  first_name: string;
  last_name: string;
}): ReactElement => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { status } = additionalInfo;

  // Обертываем logOut в useCallback, чтобы избежать пересоздания функции
  const handleLogOut = useCallback(
    () => logOut(dispatch, navigate),
    [dispatch, navigate]
  );

  // Функция для возврата на предыдущую страницу
  const goBack = useCallback(() => navigate(-1), [navigate]);

  return (
    <header className={styles.employee_head}>
      <nav className={styles.employee_head__buttons}>
        <CustomButton func={goBack} value="Назад" imageOnMob={arrowImage} />
        <CustomButton
          func={handleLogOut}
          value="Выход"
          imageOnMob={exitImage}
        />
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
          <p className={styles.employee_head__info_text__status}>{status}</p>
        </div>
      </span>
    </header>
  );
};

export default EmployeeHead;
