// common.js
import Cookies from "js-cookie";

const url = ["http://localhost:3005"];
export const webUrl = url.at(0);

const userData = Cookies.get("authToken");
const parsifiedData = userData ? JSON.parse(userData) : null;

export { parsifiedData };
