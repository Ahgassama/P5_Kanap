import { getParamFromUrl } from "./functions.js";

const orderId = getParamFromUrl("orderId");
console.log(orderId);

let getId = document.getElementById("orderId");
getId.innerHTML = orderId;
