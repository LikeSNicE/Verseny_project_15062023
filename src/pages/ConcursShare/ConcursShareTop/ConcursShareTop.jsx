import React from 'react';
import styles from './ConcursShare.module.scss';
import TagScience from '../../../Components/TagScience/tagScience';

const ConcursShareTop = ({contestData}) => {

  return (
    <div className={styles.result}>
      <div className={styles.resultTop}>
        <div className={styles.resultTopLeft}>
          <img
            src={contestData.concurs.img}
            alt={contestData.concurs.name}
          />
        </div>
        <div className={styles.resultTopRight}>
          <div className={styles.resultTopRightTitle}>
            {contestData.concurs.name}
          </div>
          <div className={styles.resultTopRightGrid}>
              <TagScience
                className={styles.resultTopRightScience}
                children={contestData.concurs.category.name}
                backgroundColor={contestData.concurs.category.color}
              />
          </div>

          <div className={styles.resultTopRightGridContainer}>
            <h3 className={styles.resultTopRightTitleDate}>
              Дата начало - конец :
            </h3>
            <div className={styles.resultTopRightDate} variant="span">
              {contestData.concurs.start_contest} - {contestData.concurs.end_contest}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConcursShareTop;