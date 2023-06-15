import React,{useEffect} from 'react';
import { useContext } from 'react';
import { Context } from '../..';
import { Navigate } from 'react-router-dom';


const Logout = () => {

  const {Authstore} = useContext(Context)

  useEffect(() => {
    Authstore.logout();
   // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  return <Navigate to={"/login"}/>
};

export default Logout;