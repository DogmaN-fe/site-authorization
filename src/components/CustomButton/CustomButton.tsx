import { MouseEventHandler } from "react";
import styles from "./CustomButton.module.sass";
import { useState, useEffect } from "react";

const CustomButton = ({
  func, // Функция, вызываемая при клике на кнопку
  value, // Текст, отображаемый на кнопке
  imageOnMob, // Ссылка на изображение для мобильных устройств
}: {
  func: MouseEventHandler<HTMLButtonElement>;
  value: string;
  imageOnMob: string;
}) => {
  // Хук состояния для определения, является ли устройство мобильным
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 750);

  // Хук эффекта для обработки изменения размера окна
  useEffect(() => {
    // Функция для обработки изменения размера окна
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 750); // Обновление состояния при изменении размера окна
    };

    // Добавление обработчика события resize
    window.addEventListener("resize", handleResize);

    // Очистка обработчика события
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <button className={styles.button} onClick={func}>
      {/* Применение стилей и функции клика */}
      {isMobile ? <img src={imageOnMob} alt={imageOnMob} /> : value}
      {/* Отображение изображения или текста в зависимости от устройства */}
    </button>
  );
};

export default CustomButton;
