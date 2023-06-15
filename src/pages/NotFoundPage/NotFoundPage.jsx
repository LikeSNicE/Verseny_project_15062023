import React from 'react';
import styles from './NotFoundPage.module.scss';
import errorImg from '../../assets/images/404/404.png';
import ButtonCustom from '../../Components/ButtonCustom/ButtonCustom';
import { Link } from 'react-router-dom';
const NotFoundPage = () => {
  return (
    <div className={styles.error}>
      <div className={styles.errorLeft}>
        <img src={errorImg} alt="error img" />
      </div>
      <div className={styles.errorRight}>
        <h1 className={styles.errorRightTitle}>Ой!,Страница не найдена</h1>
        <p className={styles.errorRightText}>
          Мы извиняемся, похоже мы не смогли найти страницу по запросу. Может
          быть вы ввели не правильный адрес, либо она была удалена
        </p>
        <ButtonCustom
          className={styles.errorRightButton}
          variant="contained"
          children={
            <Link className={styles.errorRightLink} to={"/"}>
              Назад к домашней странице
            </Link>
          }
        />
      </div>
    </div>
  );
};

export default NotFoundPage;