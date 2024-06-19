import { additionalInfo } from "../../utils/additional-info"; // Дополнительная информация о сотруднике
import { IEmployeeData } from "../../utils/types"; // Тип данных пользователя
import styles from "./Employee.module.sass"; // Стили модуля
import EmployeeHead from "../EmployeeHead/EmployeeHead"; // Компонент шапки сотрудника
import EmployeeContacts from "../EmployeeContacts/EmployeeContacts"; // Компонент контактов сотрудника
import EmployeeDescription from "../EmployeeDescription/EmployeeDescription"; // Компонент описания сотрудника

const Employee = ({
  user, // сотрудника
}: {
  user: IEmployeeData;
}) => {
  return (
    <section className={styles.employee}>
      {/* Шапка сотрудника с аватаром и именем */}
      <EmployeeHead
        avatar={user?.avatar}
        first_name={user?.first_name}
        last_name={user?.last_name}
      />
      {/* Блок с описанием и контактами сотрудника */}
      <div className={styles.employee__description}>
        {/* Описание сотрудника */}
        <EmployeeDescription description={additionalInfo.description} />
        {/* Контакты сотрудника */}
        <EmployeeContacts email={user.email} phone={additionalInfo.phone} />
      </div>
    </section>
  );
};

export default Employee;
