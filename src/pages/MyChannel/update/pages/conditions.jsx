import React from 'react';
import styles from "../update.module.scss";
import ButtonCustom from '../../../../Components/ButtonCustom/ButtonCustom';
import { useOutletContext } from 'react-router-dom';
const ConditionsUpdateConcurs = () => {
  const context = useOutletContext();
  return (
    <div className={styles.sectionCondition}>
      <div className={styles.sectionUpdateTitle}>Условия</div>
      <textarea
        className={styles.sectionUpdateTextArea}
        placeholder="Условия конкурса"
      >
        {context.getValues("conditionals")}
      </textarea>
      <div className={styles.sectionUpdateMainBtnBox}>
          <ButtonCustom loading={context.isLoadingButton}  type="submit">Изменить</ButtonCustom>
        </div>
    </div>
  );
};

export default ConditionsUpdateConcurs;