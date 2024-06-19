import { ChangeEventHandler } from "react"; // Тип для обработчика изменений
import styles from "./CustomInput.module.sass"; // Стили для компонента

const CustomInput = ({
  type, // Тип поля ввода
  name, // Имя поля для идентификации
  text, // Текст метки
  value, // Значение поля ввода
  handleChange, // Функция для обработки изменений
  placeholder, // Текст-подсказка внутри поля
  error, // Текст ошибки
}: {
  type: string;
  name: string;
  text: string;
  value: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  error?: string;
}) => {
  return (
    <label className={styles.label}>
      {/* Контейнер метки */}
      <p className={styles.label__title}>{text}</p> {/* Заголовок метки */}
      <input
        type={type} // Установка типа поля ввода
        name={name} // Установка имени поля
        value={value} // Установка значения поля
        onChange={handleChange} // Привязка функции обработки изменений
        placeholder={placeholder} // Установка текста-подсказки
        className={styles.label__input} // Применение стилей для поля ввода
      />
      {error && <p className={styles.label__error}>{error}</p>}
      {/* Отображение текста ошибки, если он есть */}
    </label>
  );
};

export default CustomInput;
