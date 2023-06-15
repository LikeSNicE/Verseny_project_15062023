import React, { useEffect,useState,useContext } from 'react';
import FilterBlockCustom from '../../../Components/FilterBlock/FilterBlock';
import CardCustom from '../../../Components/CardCutsom/CardCustom';
import styles from '../MyChannel.module.scss';
import { observer } from 'mobx-react-lite';
import LoadingCustom from '../../../Components/LoadingCustom/LoadingCustom';
import { Context } from '../../..';
import { Grid, MenuItem } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ButtonCustom from '../../../Components/ButtonCustom/ButtonCustom';
import DeleteContestModal from '../../../Components/ModalComponents/DeleteContestModal/DeleteContest';
import ButtonDropdown from '../../../Components/ButtonDropDownCustom/ButtonDropdown';
import ModalCustom from '../../../Components/Modal/Modal';
import { CustomLinkIcon } from '../../../Components/CutsomLink/CustomLink';
import IconCustom from '../../../Components/IconCustom/IconCustom';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import NotFoundContest from '../../../Components/NotFoundContest/NotFoundContest';
import { Link } from 'react-router-dom';


const TabConcurs = () => {
  const [isLoading,setIsLoading] = useState(true);
  const [myContests,setMyContest] = useState([]);
  const [dataDelete,setDataDelete] = useState({});
  const {Conteststore} = useContext(Context);
  const getContest = () =>{
    Conteststore.GetMyContestChannel().then((responce) => {
      setIsLoading(false);
      setMyContest(responce.contests);
    });
  }
  useEffect(()=>getContest()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ,[]);
  const [open, setIsOpen] = useState(false);
  if(isLoading){
    return <LoadingCustom/>
  }
  const deleteOpenModal = (data) =>{
    setDataDelete(data.concurs)
    setIsOpen(true)
  }
  const filterConcurs = (id) =>{
    setMyContest(Conteststore.filterContestByCategory(Conteststore.myContests,id));
  }
  const sortConcurs = (callback) =>{
    setMyContest(myContests.sort(callback));
  }
  if(myContests.length === 0){
    return (
      <div>
        <FilterBlockCustom  getSort={e => console.log(e)} getTagButton={id => filterConcurs(id)}/>
        <NotFoundContest/>
      </div>
    )
  }
  return (
    <div>
      <FilterBlockCustom  getSort={callback => sortConcurs(callback)} getTagButton={id => filterConcurs(id)}/>
      <div className={styles.profileCards}>
        {
        myContests.map((item, index) => (
          <CardCustom key={index} dataCard={item}>
             <Grid container spacing={0.5}>
                <Grid item xs={8}>
                  <Link to={`/concurs-share/${item.concurs.id}`}>
                    <ButtonCustom
                      style={{ fontSize: "13px", width: "100%" }}
                      color="primary"
                      startIcon={<IconCustom icon={"PeopleAltOutlined"} />}
                    >
                      Участники
                    </ButtonCustom>
                  </Link>
                </Grid>
                <Grid item xs={4}>
                  <ButtonDropdown
                    buttonChildren="Еще"
                    style={{ backgroundColor: "#D9D9D9", fontSize: "13px" }}
                  >
                    {
                      !item.concurs.isWinner &&
                      <MenuItem>
                      <CustomLinkIcon
                        to={`update/${item.concurs.id}/main`}
                        children={"Редактировать"}
                        Icon={<EditOutlinedIcon />}
                        className={styles.menuProfileItemLink}
                      />
                      </MenuItem>
                    }
                    <MenuItem onClick={() => deleteOpenModal(item)}>
                      <div>
                        <IconCustom icon="DeleteOutlineOutlined" />
                        Удалить
                      </div>
                    </MenuItem>
                  </ButtonDropdown>
                </Grid>
              </Grid>
          </CardCustom>
        ))}
      </div>
      <ModalCustom
      iconTopSection={<DeleteOutlineOutlinedIcon />}
      TopSectiontext="Удаление конкурса"
      open={open}
      setIsOpen={setIsOpen}
      iconTopSectionStyles={styles.topIcon}
      >
      <DeleteContestModal dataContest={dataDelete} setMyContest={setMyContest} setIsOpen={setIsOpen}/>
      </ModalCustom>
    </div>
  );
};

export default observer(TabConcurs);