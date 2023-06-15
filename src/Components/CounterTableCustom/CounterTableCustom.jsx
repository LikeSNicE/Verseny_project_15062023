import React, { useState } from "react";
import CounterCustom from "../CounterCustom/CounterCustom";
import TableUI from "../../UI/Table/Table";
import { useForm } from "react-hook-form";
import ButtonUI from "../../UI/Button/Button";
import { Link } from "react-router-dom";

export default function CounterTableCustom() {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState([
    [
      {
        Place: `1`,
      },
      {
        TextField: {
          label: "Введите приз",
          register: register(`prize_1`),
        },
      },
    ],
  ]);
  const generateArray = (value) => {
    let generateArray = Array(value)
      .fill()
      .map((_, i) => [
        {
          Place: `${i + 1}`,
        },
        {
          TextField: {
            label: "Введите приз",
            register: register(`prize_${i + 1}`),
          },
        },
      ]);
    setData(generateArray);
  };

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CounterCustom max={20} getValue={(value) => generateArray(value)} />
      <TableUI head={["Место", "Приз"]} data={data} />
      <ButtonUI color="primary" type="submit">
        Send
      </ButtonUI>
    </form>
  );
}
