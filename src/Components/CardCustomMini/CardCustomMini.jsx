import React from 'react'
import styles from './CardCustomMini.module.scss';
import AvatarCustom from '../AvatarCustom/AvatarCustom';

export default function CardPendingConcurs({concurs}) {
  return (
    <div className={styles.ContainerCardPendingFlex}>
        <img src={concurs.concurs.img} alt={concurs.concurs.name} className={styles.ContainerCardPendingImgPending}/>
        <div className={styles.ContainerCardPendingGrid}>
          <h4 className={styles.ContainerCardPendingtextCard}>
            {concurs.concurs.name}
          </h4>
          <AvatarCustom data={concurs.author} sizeAvatar={{width:"30px",height:"30px"}} fontSize={{name:"13px"}}/>
        </div>
    </div>
  )
}
