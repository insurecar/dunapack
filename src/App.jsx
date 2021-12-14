import React, { useEffect, useState } from "react";
import { Item } from "./Item";
import { fetchs } from "./fetching";
import { Loader } from "./Loader";
import "react-datepicker/dist/react-datepicker.css";
import loader from "./styles/icons/loader.png";
import cn from "classnames";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import check from "./styles/icons/inform.png";
import { sendData } from "./fetching";
import { address } from "./arrayOfSelect";
import moment from "moment";

export const App = () => {
  const [data, setData] = useState([]); // загальний стейт для рендеру всіх даних!!!
  const [dataLength, setDataLength] = useState(0); // відслідковує довжину масиву і добавляє клас
  const [localState, setLocalState] = useState([]); //локальний стейт тільки вибраних елементів і ті які будуть відправлені на сервер
  const [clearData, setClearData] = useState(false); // очищення даних після нажимання кнопки повторити обрані замовлення
  const [count, setCount] = useState(9); // кількість елементів таблиці для початкового рендеру

  const [countOfCheckedElement, setCountOfCheckedElement] = useState(0);
  const [visibleLoader, setVisibleLoader] = useState(false);

  const notify = () =>
    toast.info(
      "Дякую, замовлення прийнято! Ваш менеджер вже сповіщений, будь ласка, очікуйте на зворотній зв'язок!",
      {
        icon: () => <img src={check} alt="inform" />,
      }
    );

  const classes = cn("box__send-order", {
    "box__send-order-disabled":
      !Boolean(countOfCheckedElement) || localState.some((el) => el.error),
  });

  const classesForDownloadMore = cn("download-more", {
    "download-more-display-none": dataLength <= count,
  });

  const classShowHideLoader = cn("box__loader", {
    "box__loader-hide": visibleLoader,
  });

  useEffect(() => {
    setVisibleLoader(false);
    fetchs().then((resp) => {
      setVisibleLoader(true);
      setData(resp.data);
      setDataLength(resp.data.length);
    });
  }, []);

  useEffect(() => {
    setCountOfCheckedElement(localState.length);
  }, [localState.length]);

  const handleChangeCheckbox = (element) => {
    const existElement = localState.filter((elem) => element.id === elem.id);
    if (existElement.length) {
      setLocalState(localState.filter((elem) => element.id !== elem.id));
    } else {
      setLocalState([...localState, element]);
    }
  };

  const handleInput = (value, id) => {
    console.log("value", value);
    console.log("id", id);
    setLocalState(
      localState.map((elem) => {
        if (elem.id === id) {
          elem.count = +value.replace(/\s+/g, "");
          if (!+elem.count) {
            elem.error = true;
          } else {
            elem.error = false;
          }
        }
        return elem;
      })
    );
  };

  const handleSelect = (value, id) => {
    localState.map((item) =>
      item.id === id ? (item.address = value.label) : item.address[0].value
    );
  };

  const handleSetData = () => {
    setLocalState([]);
    setClearData((state) => !state);
    sendData(localState);
  };

  const handleDesireDate = (date, id) => {
    localState.map((elem) =>
      elem.id === id
        ? (elem.desiredDate = moment(date).format("DD-MM-yyyy"))
        : elem
    );
  };

  return (
    <div className="box">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        toastClassName="customToast"
      />
      <div className="box__title">
        Нове замовлення з історії
        <div className={classShowHideLoader}>
          <Loader />
          <div className="box__loader-title">Зачекайте, будь ласка</div>
        </div>
      </div>
      <div className={classes}>
        <div className="box__title-history">За останні 90 днів</div>

        <button
          onClick={() => {
            notify();
            handleSetData();
            fetchs().then((resp) => setData(resp.data));
            setTimeout(() => {
              window.location.href =
                "https://www.dunapack-tavria.com/osobystyy-kabinet";
            }, 5000);
          }}
          disabled={
            !Boolean(countOfCheckedElement) || localState.some((el) => el.error)
          }
        >
          Повторити обрані замовлення
        </button>
      </div>

      <table className="table">
        <thead>
          <tr className="table__main-tr">
            <th>{""}</th>
            <th>Дата замовлення</th>
            <th>Найменування</th>
            <th>Кількість</th>
            <th>Марка</th>
            <th>Кількість кольорів</th>
            <th>Адреса доставки</th>
            <th>Бажана дата доставки</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(0, count).map((elem) => {
            return (
              <Item
                elem={elem}
                handleCheckbox={handleChangeCheckbox}
                handleInput={handleInput}
                handleSelect={handleSelect}
                clearData={clearData}
                key={elem.id}
                handleDesireDate={handleDesireDate}
                address={address}
              />
            );
          })}
        </tbody>
      </table>
      <div className={classesForDownloadMore}>
        <button
          onClick={() => setCount(count + 9)}
          disabled={dataLength <= count}
        >
          <div>
            <img src={loader} alt="loader" />
          </div>
          Показати ще
        </button>
      </div>
      <p></p>
    </div>
  );
};
