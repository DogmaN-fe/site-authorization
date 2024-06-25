import { ReactElement } from "react";
import styles from "./EmployeeDescription.module.sass";

/**
 * Секция дополнительной информации сотрудника
 * @param description Массив с информацией
 */
const EmployeeDescription = ({
  description,
}: {
  description: string[];
}): ReactElement => {
  return (
    <article className={styles.employee__description}>
      {description.map((item, index) => (
        <p className={styles.employee__description__text} key={index}>
          {item}
        </p>
      ))}
    </article>
  );
};

export default EmployeeDescription;
