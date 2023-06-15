import React, { useContext, useState } from "react";
import styles from './DeleteContest.module.scss';
import ButtonCustom from "../../ButtonCustom/ButtonCustom";
import TagScience from "../../TagScience/tagScience";
import { Context } from "../../..";
import AlertCustom from "../../AlertCustom/AlertCustom";

const DeleteContestModal = ({dataContest,setIsOpen,setMyContest}) => {
  const {Conteststore} = useContext(Context);
  const [isLoading,setIsLoading] = useState(false);
  const [message,setMessage] = useState({});
  const deleteContest = () =>{
    setIsLoading(true);
    Conteststore.deleteContest(dataContest.id).then(responce =>{
      setMyContest(responce.contest);
      Conteststore.setMyContests(responce.contest);
      setMessage(responce);
      setIsLoading(false);
      setTimeout(()=>{
        setIsOpen(false)
      },3000);
    });
  }

  return (
    <div className={styles.sectionDeleteContest}>
      <h1 className={styles.sectionDeleteContestTitle}>
        Вы действительно хотите удалить конкурс ?
      </h1>
      <div className={styles.sectionDeleteContestSubtitle}>
        При удалаление вы потеряете все данные связаны с конкурсом :
        <ul className={styles.sectionDeleteContestList}>
          <li className={styles.sectionDeleteContestItem}>Участники</li>
          <li className={styles.sectionDeleteContestItem}>
            Файлы с участниками
          </li>
          <li className={styles.sectionDeleteContestItem}>
            <h4>Информацию об конкурсе:</h4>
            <p>Название: {dataContest.name}</p>
            <p>
              Категория:{" "}
              <TagScience
                children={dataContest.category.name}
                backgroundColor={dataContest.category.color}
              />
            </p>
          </li>
        </ul>
      </div>
      <div className={styles.sectionDeleteContestFlexBtn}>
        <ButtonCustom onClick={deleteContest} loading={isLoading}>
          Удалить
        </ButtonCustom>
        <ButtonCustom variant="outlined" onClick={() => setIsOpen(false)}>
          Отменить
        </ButtonCustom>
      </div>
      <div className={styles.notification}>
        <AlertCustom {...message} setError={setMessage} />
      </div>
    </div>
  );
};

export default DeleteContestModal;