import styles from "./EmployeeDescription.module.sass";

const EmployeeDescription = ({
  description, // Массив строк с описанием
}: {
  description: string[];
}) => {
  return (
    <article className={styles.employee__desciption}>
      {description.map((item, index) => (
        <p className={styles.employee__desciption__text} key={index}>
          {item}
        </p>
      ))}
    </article>
  );
};

export default EmployeeDescription;
