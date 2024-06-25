import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import CustomButton from "../CustomButton/CustomButton";
import { AppDispatch } from "../../utils/redux/store";

import exitImage from "../../assets/exit.svg";
import styles from "./CardsPageHeader.module.sass";
import { ReactElement, useCallback } from "react";
import { logOut } from "../../utils/scripts";

/**
 * Шапка странички с карточками сотрудников
 */
const CardsPageHeader = (): ReactElement => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Обертываем logOut в useCallback, чтобы избежать пересоздания функции
  const handleLogOut = useCallback(
    () => logOut(dispatch, navigate),
    [dispatch, navigate]
  );

  return (
    <header className={styles.header}>
      <span className={styles.header__possiton_button}>
        <CustomButton
          func={handleLogOut}
          value="Выход"
          imageOnMob={exitImage}
        />
      </span>
      <div className={styles.header__info}>
        <h1 className={styles.header__info_title}>Наша команда</h1>
        <h2 className={styles.header__info_description}>
          Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые
          ложатся на их плечи, и умеющие находить выход из любых, даже самых
          сложных ситуаций.
        </h2>
      </div>
    </header>
  );
};

export default CardsPageHeader;
