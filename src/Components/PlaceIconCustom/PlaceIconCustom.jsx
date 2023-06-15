import React from "react";
import { ReactComponent as LogoPlace } from "../../assets/images/icons/place.svg";
import './PlaceIconCustom.scss';

const getColor = (place) => {
  switch (place) {
    case "1":
      return "first";
    case "2":
      return "second";
    case "3":
      return "third";
    default:
      return "";
  }
};

export default function PlaceIcon({ place }) {
  return (
    <div
      style={{ display: "flex", alignItems: "center" }}
      className={"placeIcon " + getColor(place)}
    >
      <div style={{ height: "52px", marginRight: "10px" }}>
        <LogoPlace />
        <h4 className="place-icon-number">{place}</h4>
      </div>
      <h4>Место</h4>
    </div>
  );
}
