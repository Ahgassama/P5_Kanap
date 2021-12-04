import { getParamFromUrl } from "./functions.js";

//Création de la variable appelant la fonction pour récupérer l'id de la commande et affichage
const orderId = getParamFromUrl("orderId");

let getId = document.getElementById("orderId");
getId.innerHTML = orderId;

//Suppression du stockage des données
localStorage.clear();
