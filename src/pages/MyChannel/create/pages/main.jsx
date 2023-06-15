import React, { useContext } from "react";
import styles from "../create.module.scss";
import TextFieldUI from "../../../../Components/InputCustom/InputCustom";
import SelectUI from "../../../../Components/Select/Select";
import CategoryContest from "../../../../Components/CategoryContest/CategoryContest";
import { useOutletContext } from "react-router-dom";
import InputPoster from "../../../../Components/InputPoster/InputPoster";
import { Context } from "../../../..";
import { observer } from "mobx-react-lite";

const MainConcurs = () => {
  // store
  const { Conteststore } = useContext(Context);

  const context = useOutletContext();
  
  // min date 
  const today = new Date().toISOString().split("T")[0];

  // max date 
  const inputStartContest = {
    min: today,
  };

  const inputEndContest = {
    min: context.watch("start_contest") ? context.watch("start_contest") : today,
  };
  console.log(Conteststore.typesOfContest);
  return (
    <div className={styles.sectionMain}>
      {/* <ImageUploader /> */}
      <div className={styles.sectionMainInputPoster}>
        <InputPoster
          defaultImage={context.getValues("img")}
          getImage={(image) => context.setValue("img", image)}
        />
      </div>

      <div className={styles.sectionMainBlockFirst}>
        <div className={styles.sectionMainBlockFirstInput}>
          <TextFieldUI
            register={context.register("name", {
              required: "Поле обязателько к заполнению",
            })}
            variant="standard"
            label="Введите название"
          />
        </div>
        <div className={styles.sectionMainBlockFirstSelect}>
          <CategoryContest
            defaultData={context.getValues("category_id")}
            getData={(value) => context.setValue("category_id", value)}
          />
        </div>
      </div>

      <div className={styles.sectionMainFlexTitle}>
        <div className={styles.sectionMainTitleDate}>Дата начало - конец :</div>

        <div className={styles.sectionMainTitleDate}>Выбирите тип участия</div>
      </div>

      <div className={styles.sectionMainBlockSecond}>
        <div className={styles.sectionMainBlockSecondDate}>
          <TextFieldUI
            inputProps={inputStartContest}
            register={context.register("start_contest", {
              required: "Поле обязателько к заполнению",
            })}
            type={"date"}
            style={{ marginRight: "10px" }}
          />
          <span>-</span>
          <TextFieldUI
            register={context.register("end_contest", {
              required: "Поле обязателько к заполнению",
            })}
            type={"date"}
            style={{ marginLeft: "10px" }}
            inputProps={inputEndContest}
          />
        </div>

        <div className={styles.sectionMainBlockSecondCategory}>
          <SelectUI
            emptyLabel={"Выберите тип участия"}
            // option={arraySelectOptionTypeParticipation}
            option={Conteststore.typesOfContest}
            // label="Выберите тип участия"
            defaultValue={context.getValues("type_contest_id")}
            getValue={(value) => context.setValue("type_contest_id", value)}
          />
        </div>
      </div>

      <div className={styles.sectionMainTextWarning}>
        При изменение сменить тип участия нельзя
      </div>
    </div>
  );
};

export default observer(MainConcurs);
