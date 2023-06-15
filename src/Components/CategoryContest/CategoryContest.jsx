import React,{useContext} from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Context } from "../..";
import { observer } from "mobx-react-lite";

function CategoryContest({ getData, data,defaultData}) {
  // store

  const { Conteststore } = useContext(Context);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (categoryArg) => {
    setAnchorEl(null);
    if (categoryArg !== undefined) {
      setCategory(categoryArg);
      getData(categoryArg.value);
    }
    console.log(categoryArg);
  };
  const [category, setCategory] = React.useState({
    color: "#D9D9D9",
    name: "Выберите категорию",
    value: "",
  });

  const categoryFilter = Conteststore.categories.filter(
    (category) => category.value === defaultData
  );

  React.useEffect(() => {
    defaultData && setCategory(categoryFilter[0]);
    getData && getData(category.value);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultData]);

  return (
    <div>
      <ButtonCustom
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        style={{ backgroundColor: category.color }}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {category.name}
      </ButtonCustom>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(category)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {Conteststore.categories.map((value,index) => (
          <MenuItem key={index} onClick={() => handleClose(value)}>{value.name}</MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default observer(CategoryContest)