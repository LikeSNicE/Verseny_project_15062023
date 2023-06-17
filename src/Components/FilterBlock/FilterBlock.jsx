import React, { useContext, useEffect, useState } from "react";
import styles from "./FilterBlock.module.scss";
import SelectUI from "../Select/Select";
import TagButton from "../TagButton/TagButton";
// import SliderCustom from "../SliderCustom/SliderCustom";
import { Context } from "../..";

export const arraySelectOption = [
  { label: "По новым", value: "1", callback: (a,b)=> (b.concurs.id - a.concurs.id) },
  { label: "По популярных", value: "2" ,callback: (a,b)=> (b.concurs.participant - a.concurs.participant)},
];

const FilterBlockCustom = ({getTagButton,getSort}) => {
  const {Conteststore} = useContext(Context);

  const tagButton = {
    name:"Все",
    value:"",
    color:"#4A4A4E"
  }
  const setSortToCallBack = (value) =>{
    let sortedCallback = arraySelectOption.filter(item => item.value === value)[0].callback;
    getSort(sortedCallback);
  }
  const [category,setCategory] = useState(Conteststore.categories);
  useEffect(() =>{
    Conteststore.GetCategoriesAndTypes().then(responce => {
      setCategory(responce.categories)
    });
    // setSortToCallBack("1");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className={styles.sectionFilter}>
      <div className={styles.sectionFilterSelect}>
        <SelectUI
          option={arraySelectOption}
          getValue={(value) => setSortToCallBack(value)}
          label={"Сортировать"}
        />
      </div>

      <div className={styles.sectionFilterTagsBtn} onChange={(e) => getTagButton(e.target.value)}>
        <TagButton tag={tagButton}/>
        {category.map((item, index) => (
          <TagButton key={index} tag={item}/>
        ))}
      </div>
    </div>
  );
};

export default FilterBlockCustom;
