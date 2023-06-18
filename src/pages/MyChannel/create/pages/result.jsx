import React from 'react';
import styles from '../create.module.scss';
import { useOutletContext } from 'react-router-dom';
import { ConvertDataConcurs, validProps } from './prizesDataTable';
import ConcursDetails from '../../../ConcursDetails/ConcursDetails';


const ResultConcurs = () => {
  const context = useOutletContext();
  !context.getValues("type_contest_id") && context.setValue("type_contest_id",1);
  const resultCheckContest = ConvertDataConcurs(context.getValues());

  if(!validProps(context.getValues())){
    return (
      <div className={styles.sectionError}>
         <img
            src="https://media.istockphoto.com/id/1095047472/vector/error-page-dead-emoji-illustration.jpg?s=612x612&w=0&k=20&c=mEAErA572V--tYXvGYaNcclA17boFY8S8UwIgOgCZek="
            alt="error"
          />
          <h3>Вы не ввели все данные</h3>
          <p>Просмотрите на предыдушие пункты и убедитесь в корректности</p>
      </div>
    );
  }

  return (
    <div className={styles.sectionResult}>
      <ConcursDetails preview={true} {...resultCheckContest} />
    </div>
  );
};

export default ResultConcurs;