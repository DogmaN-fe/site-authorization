import phoneImage from "../../assets/phone.svg";
import emailImage from "../../assets/email.svg";

import styles from "./EmployeeContacts.module.sass";

const EmployeeContacts = ({
  email, // Электронная почта сотрудника
  phone, // Телефон сотрудника
}: {
  email: string;
  phone: string;
}) => {
  return (
    <aside className={styles.employee_contacts}>
      <span className={styles.employee_contacts__way}>
        <img
          src={phoneImage}
          alt="phone"
          className={styles.employee_contacts__way_img}
        />
        <p className={styles.employee_contacts__way_text}>{phone}</p>
      </span>
      <span className={styles.employee_contacts__way}>
        <img
          src={emailImage}
          alt="email"
          className={styles.employee_contacts__way_img}
        />
        <p className={styles.employee_contacts__way_text}>{email}</p>
      </span>
    </aside>
  );
};

export default EmployeeContacts;
