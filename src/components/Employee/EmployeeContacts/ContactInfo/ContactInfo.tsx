import { ReactElement } from "react";
import styles from "./ContactInfo.module.sass";

/**
 * Компонент для отображения контактной информации
 * @param image Изображения типа контакта
 * @param alt Альтернативный текст к картинке
 * @param text Сам контакт
 */
const ContactInfo = ({
  image,
  alt,
  text,
}: {
  image: string;
  alt: string;
  text: string;
}): ReactElement => {
  return (
    <span className={styles.contact}>
      <img src={image} alt={alt} className={styles.contact__img} />
      <p className={styles.contact__text}>{text}</p>
    </span>
  );
};

export default ContactInfo;
