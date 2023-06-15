import React from 'react';
import styles from '../create.module.scss';
import { useOutletContext } from 'react-router-dom';

const ConditionsConcurs = () => {

  const context = useOutletContext();

  return (
    <div className={styles.sectionConditions}>
      <textarea
        className={styles.sectionDescriptionTextArea}
        placeholder="Условия конкурса"
        onInput={(e) => context.setValue("conditionals", e.target.value)}
      >
        {context.getValues("conditionals")}
      </textarea>
    </div>
  );
};

export default ConditionsConcurs;