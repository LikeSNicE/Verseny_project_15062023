import React, { useContext, useState } from 'react'
import ButtonCustom from '../ButtonCustom/ButtonCustom'
import { Context } from '../..';
import { Snackbar,Alert} from '@mui/material';

export default function ButtonSubcribers({isSubcribers = false,channel_id}) {
    const [isSubcriber,setIsSubcriber] = useState(isSubcribers);
    const {Channelstore} = useContext(Context)
    const [isOpen,setIsOpen] = useState(false);
    const [message,setMessage] = useState("");
    const style = {
        background: isSubcriber ? "#D9D9D9": "#E8533F",
        borderRadius: "10px"
    }
    const handleClick = () =>{
        Channelstore.subcribe(channel_id).then(responce =>{
            setIsSubcriber(responce.isSubscribed);
            setMessage(responce);
            setIsOpen(responce.open);
        });
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setIsOpen(false);
      }; 
  return (
    <div>
       <ButtonCustom style = {style} onClick={()=> handleClick()}>
            {isSubcriber ? "Вы подписаны" : "Подписаться"}
        </ButtonCustom>
       <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={message.severity} sx={{ width: '100%' }}>
            {message.message}
          </Alert>
        </Snackbar>
    </div>
  )
}
