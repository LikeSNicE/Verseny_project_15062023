import React, { useState } from "react";
import styles from "../update.module.scss";
import TableUI from "../../../../Common/Table/Table";
import { headData } from "./prizesUpdateData";
import ButtonCustom from "../../../../Components/ButtonCustom/ButtonCustom";
import CounterCustom from "../../../../Components/CounterCustom/CounterCustom";
import { useOutletContext } from "react-router-dom";

const PrizesConcursUpdate = () => {
  const context = useOutletContext();
  const [data, setData] = useState([
    [
      {
        PlaceIcon: "1",
      },
      {
        TextField: {
          label: "Введите приз",
          register: context.register("prizes_1"),
        },
      },
    ],
  ]);

  const generateArray = (value) => {
    let generateArray = Array(value)
      .fill()
      .map((item, i) => [
        {
          PlaceIcon: `${i + 1}`,
        },
        {
          TextField: {
            label: "Введите приз",
            register: context.register(`prizes_${i + 1}`),
          },
        },
      ]);
    setData(generateArray);
  };

  return (
    <div className={styles.sectionUpdatePrizes}>
      <div className={styles.sectionUpdateTitle}>Призы</div>
      <div className={styles.sectionUpdatePrizesSubtitle}>
        Количество мест победителей:
      </div>
      <div className={styles.sectionUpdatePrizesCounter}>
        <div>
          <CounterCustom 
          defaultValue={context.getValues("count")}
          getValue={(value) => generateArray(value)} />
        </div>
      </div>

      <div className={styles.sectionUpdatePrizesTable}>
        <TableUI data={data} head={headData} />
      </div>

      <div className={styles.sectionUpdateMainBtnBox}>
        <ButtonCustom type="submit" loading={context.isLoadingButton} >Изменить</ButtonCustom>
      </div>
    </div>
  );
};

export default PrizesConcursUpdate;
