import { MouseEventHandler, ReactElement } from "react";
import styles from "./CustomButton.module.sass";
import { useMediaQuery } from "react-responsive";

/**
 * Кастомная кнопка
 * @param func Функция, вызываемая при клике на кнопку
 * @param value Текст, отображаемый на кнопке
 * @param imageOnMob Ссылка на изображение для мобильных устройств
 * @returns Настроенная кнопка
 */
const CustomButton = ({
  func,
  value,
  imageOnMob,
}: {
  func: MouseEventHandler<HTMLButtonElement>;
  value: string;
  imageOnMob?: string;
}): ReactElement => {
  // Хук состояния для определения, является ли устройство мобильным
  const isMobile = useMediaQuery({ query: "(max-width: 750px)" });

  return (
    <button className={styles.button} onClick={func}>
      {isMobile && imageOnMob ? (
        <img src={imageOnMob} alt="Изображение кнопки" />
      ) : (
        value
      )}
    </button>
  );
};

export default CustomButton;
