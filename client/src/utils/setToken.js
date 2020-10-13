import axios from "axios";

export  const setTokenToHeader = (token) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
    console.log("token found")
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
console.log("token not found")
}
};


