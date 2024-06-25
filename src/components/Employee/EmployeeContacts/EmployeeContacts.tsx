import phoneImage from "../../../assets/phone.svg";
import emailImage from "../../../assets/email.svg";

import styles from "./EmployeeContacts.module.sass";
import ContactInfo from "./ContactInfo/ContactInfo";
import { ReactElement } from "react";

/**
 * Секция контактов сотрудника
 * @param email Электронная почта сотрудника
 * @param phone Телефон сотрудника
 */
const EmployeeContacts = ({
  email,
  phone,
}: {
  email: string;
  phone: string;
}): ReactElement => {
  return (
    <aside className={styles.employee_contacts}>
      <ContactInfo image={phoneImage} alt="Телефон" text={phone} />
      <ContactInfo image={emailImage} alt="Электронная почта" text={email} />
    </aside>
  );
};

export default EmployeeContacts;
