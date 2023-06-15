import React from 'react';
import styles from './ModalTopSection.module.scss';
import { IconButton } from '@mui/material';


const ModalTopSection = (props) => {
  const {iconCross ,onClick,text,icon,iconStyles} = props;
  return (
    <div className={styles.modalSectionTop}>
      <div className={styles.modalSectionTopLeft}>
        <div className={iconStyles}>{icon}</div>
        <div className={styles.modalSectionTopLeftTitle}>{text}</div>
      </div>
      <div>
        <IconButton onClick={onClick}>
          {iconCross}
        </IconButton>
      </div>
    </div>
  );
};

export default ModalTopSection;