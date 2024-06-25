import { ChangeEventHandler, ReactElement } from "react";
import styles from "./CustomInput.module.sass";

/**
 * Кастомный input
 * @param  type Тип поля ввода
 * @param name Имя поля для идентификации
 * @param text Текст метки
 * @param  value Значение поля ввода
 * @param handleChange Функция для обработки изменений
 * @param placeholder Текст-подсказка внутри поля
 * @param error Текст ошибки
 * @returns Польностью настроеный input
 */
const CustomInput = ({
  type,
  name,
  text,
  value,
  handleChange,
  placeholder,
  error,
}: {
  type: string;
  name: string;
  text: string;
  value: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  error?: string;
}): ReactElement => {
  return (
    <label htmlFor={name} className={styles.label}>
      <p className={styles.label__title}>{text}</p>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={styles.label__input}
      />
      {error && (
        <p id={`${name}-error`} className={styles.label__error}>
          {error}
        </p>
      )}
    </label>
  );
};

export default CustomInput;
