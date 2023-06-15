import React, { useContext, useEffect, useState } from 'react';
import ConcursShareTop from '../ConcursShare/ConcursShareTop/ConcursShareTop';
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import styles from './ConcursShareWinners.module.scss';
import TableUI from '../../Common/Table/Table';
import { Context } from '../..';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingCustom from '../../Components/LoadingCustom/LoadingCustom';
import convertTableWinners,{getConvertTableWinners} from './ConcursShareWinnersFunctionHelper';
import ButtonCustom from '../../Components/ButtonCustom/ButtonCustom';
import { useForm } from 'react-hook-form';
import AlertCustom from '../../Components/AlertCustom/AlertCustom';
import { observer } from 'mobx-react-lite';

const ConcursShareWinners = () => {
  const {Partipicationstore} = useContext(Context);
  const [isLoading,setIsLoading] = useState(true);
  const [contest,setContest] = useState({});
  const {id} = useParams();
  const {handleSubmit,setValue} = useForm();
  const [alert,setAlert] = useState({});
  const navigate = useNavigate();
  const headData = ["Место","Призы","Выбор победителя"];
  useEffect(() =>{
    Partipicationstore.getWinnersConcurs(id).then(res => {
      setContest(res);
      setIsLoading(false);
    })
  },[]);

  if(isLoading){
    return <LoadingCustom/>
  }

  if(contest.concurs.concurs.isWinner){
    return (
      <div className={styles.sectionConcursShareWinnersNotFound}>
        <img src="https://img.freepik.com/free-vector/team-of-happy-employees-winning-award-and-celebrating-success-business-people-enjoying-victory-getting-gold-cup-trophy-vector-illustration-for-reward-prize-champions-s_74855-8601.jpg?w=900&t=st=1686052425~exp=1686053025~hmac=19eb2d3a24565c17d5f54d5d24942e08edf50f3d8852490f9c236fbbf2b7e919" alt="winners" />
        <h3>Победители были обьявлены</h3>
      </div>
    );
  }
  const onSubmit = (data) =>{
    const json_winners = JSON.parse(contest.concurs.concurs.json_winners);
    const users_id = Object.values(data);
    if(json_winners.length === users_id.length){
      const winners = getConvertTableWinners(json_winners,users_id,contest.users)
      Partipicationstore.setWinnersConcurs(id,{json_winners:JSON.stringify(winners)})
      .then(() => setAlert({error:"Поздравляем вы обьявили победителей,через пару секунд вы будете переброшенны в другую странницу",severity:"success"})).catch(()=>{
        setAlert({error:"Извините, на сервером случились не поладки"})
      });
      setTimeout(()=>{
        navigate(`/concurs-share/${id}`);
      },3000);
    }
    else{
      setAlert({error:"Вы не заполнили все пользателя"})
    }
  }

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}
      className={styles.sectionConcursShareWinners}>
      <ConcursShareTop contestData={contest.concurs}/>
      <div className={styles.sectionConcursShareWinnersTitle}>
        Выбор Победителя :
        {<EmojiEventsOutlinedIcon/>} 
      </div>

      <TableUI head={headData} data={
        convertTableWinners(
        JSON.parse(contest.concurs.concurs.json_winners),
        contest.users,setValue)
      }/>
      <ButtonCustom 
        className={styles.sectionConcursShareWinnersBtn} 
        startIcon={<EmojiEventsOutlinedIcon/>}
        type="submit"
        loading = {Partipicationstore.isLoadingButton}
      >
        Обьявить победителей
      </ButtonCustom>
      <AlertCustom {...alert} setError={setAlert}/>
    </form>
  );
};

export default observer(ConcursShareWinners);