import React, { useState } from 'react'
import ButtonCustom from '../../../Components/ButtonCustom/ButtonCustom';
import styles from "./UsersSelect.module.scss";
import AvatarCustom from '../../../Components/AvatarCustom/AvatarCustom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Menu, MenuItem } from '@mui/material';
import SearchInputCustom from '../../../Components/SeacrhInput/SearchInput';
export default function UsersSelect({option=[],setValue,index}) {
  const [users,setUsers] = useState({
    id: "",
    name:"",
    email:"",
    avatar:""
  });
  const [list,setList] = useState(option);
  const convertUsers = (user = users) =>{
    return {
        avatar:user.avatar,
        name:user.name,
        description:user.email
    }
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (userArg) => {
    setAnchorEl(null);
    if (userArg !== undefined) {
        setUsers(userArg)
        setValue && setValue(`${index}`,userArg.id)
    }
  };
  const searchUsers = (value) =>{
    let valueTrim = value.trim().toLowerCase();
    const filteredList = option.filter(item => item.name.toLowerCase().trim().includes(valueTrim));
    setList(filteredList);
  }
  return (
    <div>
        <ButtonCustom 
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          className ={styles.BtnUsers}
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
        >
            {users.id ? 
            <AvatarCustom data={convertUsers(users)}/>
            : "Выберите победителя" 
            }
        </ButtonCustom>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={() => handleClose(users)}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
        <div className={styles.Menu}>
          <SearchInputCustom label="Поиск" getValue={searchUsers}/>
        </div>
        {list.map((value,index) => (
            <MenuItem key={index} onClick={() => handleClose(value)}>
                <AvatarCustom data={convertUsers(value)}/>
            </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
