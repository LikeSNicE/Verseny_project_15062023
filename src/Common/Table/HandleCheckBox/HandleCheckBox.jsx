export default function HandleCheckBox(event, state) {
  let updatedList = [...state];
  if (event.target.checked) {
    updatedList = [...state, event.target.value];
  } else {
    updatedList.splice(state.indexOf(event.target.value), 1);
  }
  return updatedList;
}
