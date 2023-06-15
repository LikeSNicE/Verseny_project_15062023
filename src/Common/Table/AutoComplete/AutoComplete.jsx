import { styled, lighten, darken } from "@mui/system";
import { top100Films } from "./resultData";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField/TextField";

const AutocompleteComponent = () => {
  // поиск поильзователя
  const GroupHeader = styled("div")(({ theme }) => ({
    position: "sticky",
    top: "-8px",
    padding: "4px 10px",
    color: theme.palette.primary.main,
    backgroundColor:
      theme.palette.mode === "light"
        ? lighten(theme.palette.primary.light, 0.85)
        : darken(theme.palette.primary.main, 0.8),
  }));

  const GroupItems = styled("ul")({
    padding: 0,
  });

  const options = top100Films.map((option) => {
    const firstLetter = option.title[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });

  return (
    <div>
      <Autocomplete
        id="grouped-demo"
        options={options.sort(
          (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
        )}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => option.title}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Выбор пользователя" />
        )}
        renderGroup={(params) => (
          <li key={params.key}>
            <GroupHeader>{params.group}</GroupHeader>
            <GroupItems>{params.children}</GroupItems>
          </li>
        )}
      />
    </div>
  );
};

export default  AutocompleteComponent;
