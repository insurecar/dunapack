import React, { useState, useEffect } from "react";
import cn from "classnames";
import moment from "moment";
import Select from "react-select";
import calendar from "../src/styles/icons/calendar.png";
import DatePicker, { registerLocale } from "react-datepicker";
import Scrollbar from "smooth-scrollbar";
import el from "date-fns/locale/uk"; // the locale you want
registerLocale("uk", el);

export const Item = ({
  elem,
  handleCheckbox,
  handleInput,
  handleSelect,
  clearData,
  handleDesireDate,
  address,
}) => {
  const [checked, setChecked] = useState(false);
  const [inputValueOfCount, setInputValueOfCount] = useState("");
  const [inputSelectOfAddress, setInputSelectOfAddress] = useState("");
  const [desireDate, setDesireDate] = useState(
    new Date().setDate(new Date().getDate() + 3)
  );

  const minDate = new Date();

  const classes = cn("item", { "item-checked ": checked });

  const classNameBorderLastChild = cn("wrapper", { "last-child": checked });

  const checkBoxHandler = () => {
    handleCheckbox(
      JSON.parse(JSON.stringify({ ...elem, address: elem.address[0].value }))
    );
    setChecked((state) => !state);
  };

  // useEffect(() => {
  //   setInputSelectOfAddress(options);
  // }, [options.length]);

  // console.log("options", options);
  useEffect(() => {
    setChecked(false);
    setInputValueOfCount("");
  }, [clearData]);

  useEffect(() => {
    setInputValueOfCount(elem.count);
    // setInputSelectOfAddress(elem.address[0]);
    setInputSelectOfAddress(elem.address[0]);
  }, []);

  useEffect(() => {
    document
      .querySelector(".react-datepicker__input-container input")
      ?.setAttribute("readonly", "true");
  });

  const handleInputOfCount = ({ target: { value } }, id) => {
    if (value.length < 7) {
      setInputValueOfCount(value);
      handleInput(value, id);
    }
  };

  const handleChangeOfSelectAddress = (value, id, elem) => {
    setInputSelectOfAddress(value);
    handleSelect(value, id);
  };

  const handleDesireDateItem = (date) => {
    console.log("DATEshdbcnjsdbvhjsdnbvjk", date);
    setDesireDate(date);
    handleDesireDate(date, elem.id);
  };

  const addScrollBar = (e) => {
    // setTimeout(() => {
    //   console.log(document.querySelector(".css-26l3qy-menu"));
    //   Scrollbar.init(document.querySelector(".css-4ljt47-MenuList"), {
    //     alwaysShowTracks: true,
    //     wheelEventTarget: document.querySelector(".css-4ljt47-MenuList"),
    //   });
    // }, 1000);
  };

  return (
    <tr key={elem.id} className="item-tr">
      <td>
        <label className={classes}>
          <input type="checkbox" onChange={checkBoxHandler} checked={checked} />
        </label>
      </td>
      <td>{moment(elem.dateOrdered * 1000).format("DD-MM-YY")}</td>
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
            // options={address}
            // menuIsOpen={true}
            value={inputSelectOfAddress}
            onChange={(e) => handleChangeOfSelectAddress(e, elem.id, elem)}
            className="selected"
            onMenuOpen={addScrollBar}
            isSearchable={false}
          />
        ) : (
          // <div className="address-of-delivery">{elem.address[0].label}</div>
          <div className="disabled-select">
            <Select
              // options={address}
              value={elem.address[0]}
              className="selected"
            />
          </div>
          // <div>{inputSelectOfAddress.value}</div>
        )}
      </td>
      <td>
        <div className={classNameBorderLastChild}>
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
                dateFormat="dd-MM-yy"
                locale={el}
                popperPlacement="bottom-end"
              />
            ) : (
              <div className="wrapper__calendar-static">
                {moment(elem.desiredDate * 1000).format("DD-MM-YY")}
              </div>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
};
