import React from "react";
import styles from "../create.module.scss";
import { useOutletContext } from "react-router-dom";

const DescriptionConcurs = () => {

  const context = useOutletContext();

  return (
    <div className={styles.sectionDescription}>
      <textarea
        className={styles.sectionDescriptionTextArea}
        placeholder="Описание конкурса"
        onInput={(e) => context.setValue("description",e.target.value)}
      >
        {context.getValues('description')}
      </textarea>
    </div>
  );
};

export default DescriptionConcurs;
