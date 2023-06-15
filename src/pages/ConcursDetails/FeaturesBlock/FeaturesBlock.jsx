import React from "react";
import styles from '../ConcursDetails.module.scss';

const FeaturesBlock = ({text = ""}) => {
  return (
    <div className={styles.conditionSection}>
      <h3 className={styles.conditionSectionTitle}>Условия конкурса : </h3>
      <ul className={styles.conditionSectionList}>
        <li className={styles.conditionSectionListItem}>{text}</li>
      </ul>
    </div>
  );
};

export default FeaturesBlock;
