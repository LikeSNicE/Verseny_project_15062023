import React from "react";
import styles from "../update.module.scss";
import ButtonCustom from "../../../../Components/ButtonCustom/ButtonCustom";
import { useOutletContext } from "react-router-dom";

const DescriptionUpdateConcurs = () => {
  const context = useOutletContext();
  return (
    <div className={styles.sectionDescription}>
      <div className={styles.sectionUpdateTitle}>Описание</div>
      <textarea
        className={styles.sectionUpdateTextArea}
        placeholder="Описание конкурса"
      >
        {context.getValues("description")}
      </textarea>
      <div className={styles.sectionUpdateMainBtnBox}>
        <ButtonCustom loading={context.isLoadingButton}  type="submit">Изменить</ButtonCustom>
      </div>
    </div>
  );
};

export default DescriptionUpdateConcurs;
