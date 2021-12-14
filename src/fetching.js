import axios from "axios";

// export const fetchs = () =>
//   axios.get(`https://www.dunapack-tavria.com/ajax/profile/historyOrders`); // Цей запит для тестування, його розкоментувати а нижній закоментувати

export const fetchs = () =>
  axios.get(`https://618cfaa2edab980017fd512c.mockapi.io/duna-order`);

export const sendData = (data) =>
  axios({
    method: "post",
    url: "https://www.dunapack-tavria.com/ajax/profile/createOrderFromHistory",
    data,
  });
