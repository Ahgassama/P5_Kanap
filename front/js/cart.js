let productRegister = JSON.parse(localStorage.getItem("canape"));
console.log(productRegister);

//Affichage des produits du panier
//Sélection de la classe ou injecter le code html

const positionElement = document.querySelector("#cart__items");
console.log(positionElement);

if (productRegister.length !== 0) {
  let productPanier = "";

  for (let a = 0; a < productRegister.length; a++) {
    productPanier += `<article class="cart__item" data-id="{a-ID}">
   <div class="cart__item__img">
     <img src="${productRegister[a].imageUrl}" alt="Photographie d'un canapé">
   </div>
   <div class="cart__item__content">[]
     <div class="cart__item__content__titlePrice">
       <h2>${productRegister[a].nameKanap}</h2>
       <p>${
         productRegister[a].price * productRegister[a].quantityKanap
       } euros</p>
     </div>
     <div class="cart__item__content__settings">
       <div class="cart__item__content__settings__quantity">
         <p>Qté : </p>
         <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${
           productRegister[a].quantityKanap
         }">
       </div>
       <div class="cart__item__content__settings__delete">
         <p class="deleteItem">Supprimer</p>
       </div>
     </div>
   </div>
 </article>`;
  }
  positionElement.innerHTML = productPanier;
} else {
  console.log("je  suis vide");
}

let totalPriceCalcul = [];
let totalQuantityCalcul = [];

for (let t = 0; t < productRegister.length; t++) {
  let prixTotalPanier = productRegister[t].price;
  let quantityPanier = productRegister[t].quantityKanap;
  totalPriceCalcul.push(prixTotalPanier * quantityPanier);
  totalQuantityCalcul.push(quantityPanier);
  console.log(totalQuantityCalcul);
  console.log(totalPriceCalcul);
}

const reducer = (accumulator, currentValue) => accumulator + currentValue;
const totalPrice = totalPriceCalcul.reduce(reducer, 0);
const totalQuantity = totalQuantityCalcul.reduce(reducer, 0);
console.log(totalQuantity);

/*let totalQuantityCalcul = [];
for (let q = 0; q < productRegister.length; q++) {
  
  totalQuantityCalcul.push(quantityPanier);
  console.log(totalQuantityCalcul);*/

const displayTotalPrice = document.getElementById("totalPrice");
displayTotalPrice.innerHTML = totalPrice;

const displayTotalQuantity = document.getElementById("totalQuantity");
displayTotalQuantity.innerHTML = totalQuantity;
