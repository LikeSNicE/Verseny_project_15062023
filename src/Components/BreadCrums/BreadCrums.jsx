import React from "react";
import styles from "./BreadCrums.module.scss";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";

const BreadCrums = (props) => {
  const {data} = props;
  // BreadCrums
  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
  return (
    <div className={styles.breadcrumb}>
      <div role="presentation" onClick={handleClick}>
        <Breadcrumbs className={styles.breadcrumb} aria-label="breadcrumb">
          {data.map((data, index) => (
            <Link className={styles.breadcrumbLink} key={index} to={data.path}>
              {data.name}
            </Link>
          ))}
        </Breadcrumbs>
      </div>
    </div>
  );
};

export default BreadCrums;
