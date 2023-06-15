import React from "react";
import * as Muicon from "@mui/icons-material";
// import styles from './CardTopSection.module.scss';
import './CardTopSection.scss'

export default function CardTopSection({ data }) {
  if (!data.term) {
    return;
  }
  const Icon = Muicon[data.term.icon];
  return (
    <div className={"blockTerm " + data.term.state}>
      <div className={"containerTerm"}>
        <p>Срок окончание конкурса</p>
        <div className={"containerTermFlex"}>
          <Icon />
          <p>{data.term.message}</p>
        </div>
      </div>
    </div>
  );
}
