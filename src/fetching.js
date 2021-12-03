import axios from "axios";

export const fetchs = () =>
  axios.get(`https://www.dunapack-tavria.com/ajax/profile/historyOrders`);

export const sendData = (data) =>
  axios({
    method: "post",
    url: "https://www.dunapack-tavria.com/ajax/profile/createOrderFromHistory",
    data,
  });

// export const fetchs = axios.get(
//   "https://www.dunapack-tavria.com/ajax/profile/historyOrders",
//   {
//     headers: {
//       authorization: '"39de5a2f84f41ee99ccf5bc05f0b4e96"',
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   }
// );
