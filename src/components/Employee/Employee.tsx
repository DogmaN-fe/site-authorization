import { additionalInfo } from "../../utils/additional-info";
import { IEmployeeData } from "../../utils/types";

import EmployeeHead from "./EmployeeHead/EmployeeHead";
import EmployeeContacts from "./EmployeeContacts/EmployeeContacts";
import EmployeeDescription from "./EmployeeDescription/EmployeeDescription";

import styles from "./Employee.module.sass";
import { ReactElement } from "react";

/**
 * Страничка сотрудника
 * @param user Сотрудник
 */
const Employee = ({ user }: { user: IEmployeeData }): ReactElement => {
  const { description, phone } = additionalInfo;
  return (
    <>
      <EmployeeHead
        avatar={user?.avatar}
        first_name={user?.first_name}
        last_name={user?.last_name}
      />
      <main className={styles.employee}>
        <section className={styles.employee__description}>
          <EmployeeDescription description={description} />
          <EmployeeContacts email={user.email} phone={phone} />
        </section>
      </main>
    </>
  );
};

export default Employee;
