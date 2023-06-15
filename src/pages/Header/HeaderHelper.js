import {styled,Toolbar,createTheme} from "@mui/material";
import HeaderJson from "./HeaderJson.json";

export const getIndex = (pathName,index) => {
   let path = pathName.split("/")[1];
   let pathArray = [];
   for(let i = 0;i < HeaderJson.length;i++){
    pathArray.push(HeaderJson[i].to)
   }
   let indexPath = pathArray.indexOf(`/${path}`);
   if(indexPath !== -1){
    return indexPath;
   }
   return index;
}

export const ToolBarStyled = styled(Toolbar)({
    background: "#fff",
    color: "#000",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: 300,
  });
  
  // custom theme
  
export const theme = createTheme({
    palette: {
      primary: {
        main: "#000",
      },
    },
    typography: {
      fontFamily: ["Comfortaa", "cursive"].join(","),
    },
  });