import React, { useState, useEffect } from "react";
import cn from "classnames";
import moment from "moment";
import Select from "react-select";
import calendar from "../src/styles/icons/calendar.png";
import DatePicker from "react-datepicker";

export const Item = ({
  elem,
  handleCheckbox,
  handleInput,
  handleSelect,
  clearData,
  handleDesireDate,
}) => {
  const [checked, setChecked] = useState(false);
  const [inputValueOfCount, setInputValueOfCount] = useState("");
  const [inputSelectOfAddress, setInputSelectOfAddress] = useState("");
  const [desireDate, setDesireDate] = useState(
    new Date().setDate(new Date().getDate() + 3)
  );

  const minDate = new Date();

  const classes = cn("item", { "item-checked ": checked });

  const checkBoxHandler = () => {
    handleCheckbox(elem);
    setChecked((state) => !state);
  };

  // useEffect(() => {
  //   setInputSelectOfAddress(options);
  // }, [options.length]);

  // console.log("options", options);

  const handleInputOfCount = ({ target: { value } }, id) => {
    if (value.length < 7) {
      setInputValueOfCount(value);
      handleInput(value, id);
    }
  };

  const handleChangeOfSelectAddress = (value, id) => {
    console.log("VALUE ITEM", value);
    setInputSelectOfAddress(value);
    handleSelect(value, id);
    // console.log(
    //   "%c VALUE Select",
    //   "background: coral; padding: 20px; border: 3px solid red",
    //   value
    // );

    // console.log("%c ID", "background: green; padding: 20px", id);
  };

  useEffect(() => {
    setChecked(false);
    setInputValueOfCount("");
  }, [clearData]);

  useEffect(() => {
    setInputValueOfCount(elem.count);
    setInputSelectOfAddress(elem.address[0]);
  }, [elem]);

  const handleDesireDateItem = (date) => {
    console.log("ITEM DATE", date);
    setDesireDate(date);
    handleDesireDate(date, elem.id);
  };

  return (
    <tr key={elem.id} className="item-tr">
      <td>
        <label className={classes}>
          <input type="checkbox" onChange={checkBoxHandler} checked={checked} />
        </label>
      </td>
      <td>{elem.dateOrdered}</td>
      <td>{elem.name}</td>
      <td className="item-tr__count">
        {checked ? (
          <>
            <input
              className={cn("item-tr__count-inputCountOfOrder", {
                "item-tr__count-inputCountOfOrder-error": elem.error,
              })}
              onChange={(e) => handleInputOfCount(e, elem.id)}
              value={inputValueOfCount}
              type="number"
            />
            {elem.error ? (
              <span className=" item-tr__count-showError">
                Поле не може бути порожнім
              </span>
            ) : null}
          </>
        ) : (
          <div className="item-tr__count-divCountOfOrder ">
            {elem.count.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1 ")}
          </div>
        )}
      </td>
      <td className="item-tr__brand">{elem.brand}</td>
      <td>{elem.countOfColors}</td>
      <td>
        {checked ? (
          <Select
            options={elem.address}
            value={inputSelectOfAddress}
            onChange={(e) => handleChangeOfSelectAddress(e, elem.id)}
            className="selected"
            disable
          />
        ) : (
          <div>{inputSelectOfAddress.value}</div>
        )}
      </td>
      <td>
        <div className="wrapper">
          <div className="wrapper__icon">
            <div className="wrapper__icon-center">
              <img src={calendar} alt="" />
            </div>
          </div>

          <div className="wrapper__calendar">
            {checked ? (
              <DatePicker
                minDate={minDate.setDate(minDate.getDate() + 3)}
                // locale={fi}
                selected={desireDate}
                onChange={(date) => handleDesireDateItem(date)}
                disabled={!checked}
                dateFormat="dd-MM-yyyy"
              />
            ) : (
              <div className="wrapper__calendar-static">{elem.desiredDate}</div>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
};
