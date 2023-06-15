import React from 'react';
import styles from '../update.module.scss';
import InputImageLook from '../../../../Components/InputPoster/InputPoster';
import TextFieldUI from '../../../../Components/InputCustom/InputCustom';
import ButtonCustom from '../../../../Components/ButtonCustom/ButtonCustom';
import { useOutletContext } from "react-router-dom";
import CategoryContest from '../../../../Components/CategoryContest/CategoryContest';

const MainUpdateConcurs = () => {
  const context = useOutletContext();
  const inputStartContest = {
    min: context.getValues("start_contest"),
  };
  const inputEndContest = {
    min: context.watch("start_contest") ? context.watch("start_contest") : context.getValues("start_contest"),
  };

  return (
    <div className={styles.sectionUpdateMain}>
      <div className={styles.sectionUpdateTitle}>Основная</div>
      <div className={styles.sectionUpdateMainPosterChanging}>
        <InputImageLook 
        defaultImage={context.watch("img")}
        getImage={(image) => context.setValue("img", image)}
        />
      </div>
      <div className={styles.sectionUpdateMainNameChanging}>
        <TextFieldUI register={context.register("name")} label="Введите название" variant="standard" />
      </div>
      <div className={styles.sectionUpdateMainNameChanging}>
        <CategoryContest
            defaultData={context.getValues("category_id")}
            getData={(value) => context.setValue("category_id", value)}
        />
      </div>
      <div className={styles.sectionUpdateMainTitleData}>
        Дата начало - конец :
        <div className={styles.sectionUpdateMainFlexData}>
          <TextFieldUI type="date" 
            register={context.register("start_contest")}
            inputProps={inputStartContest}
          />
           - 
          <TextFieldUI type="date"
           register={context.register("end_contest")}
           inputProps={inputEndContest}
          />
        </div>
      </div>
      <div className={styles.sectionUpdateMainBtnBox}>
          <ButtonCustom loading={context.isLoadingButton} type="submit" >Изменить</ButtonCustom>
        </div>
    </div>
  );
};

export default MainUpdateConcurs;