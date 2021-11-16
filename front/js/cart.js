let productRegister = JSON.parse(localStorage.getItem("canape"));
console.log(productRegister);

//Affichage des produits du panier
//Sélection de la classe ou injecter le code html

const positionElement = document.querySelector("#cart__items");
//console.log(positionElement);

if (productRegister.length !== 0) {
  let productPanier = "";

  for (let a = 0; a < productRegister.length; a++) {
    productPanier += `
    <article class="cart__item" data-index = "${a}">
   <div class="cart__item__img">
     <img src="${productRegister[a].imageUrl}" alt="${productRegister[a].alt}">
   </div>
   <div class="cart__item__content">
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
  //console.log(totalQuantityCalcul);
  //console.log(totalPriceCalcul);
}

const reducer = (accumulator, currentValue) => accumulator + currentValue;
const totalPrice = totalPriceCalcul.reduce(reducer, 0);
const totalQuantity = totalQuantityCalcul.reduce(reducer, 0);
//console.log(totalQuantity);

/*let totalQuantityCalcul = [];
for (let q = 0; q < productRegister.length; q++) {
  
  totalQuantityCalcul.push(quantityPanier);
  console.log(totalQuantityCalcul);*/

const displayTotalPrice = document.getElementById("totalPrice");
displayTotalPrice.innerHTML = totalPrice;

const displayTotalQuantity = document.getElementById("totalQuantity");
displayTotalQuantity.innerHTML = totalQuantity;

let itemQuantity = document.querySelector(".itemQuantity");

//Suppression article

/*function deleteProduct(event) {
  const index = event.target.getAttribute("data-index");
  productRegister.splice(index, 1);
  localStorage.setItem("canape", JSON.stringify(productRegister));
  location.reload();
}

const deleteBtn = document.querySelectorAll(".deleteItem");
for (d = 0; d < deleteBtn.length; d++) {
  deleteBtn[d].addEventListener("click", deleteProduct);
}
*/

/*let btnDelete = document.querySelectorAll(".deleteItem");
console.log(btnDelete);
for (let n = 0; n < btnDelete.length; n++) {
  btnDelete[n].addEventListener("click", (e) => {
    console.log(n);
    const elt = e.target.closest("article");
    console.log(elt);
    const index = elt.dataset.index;
    console.log(index);
    productRegister.splice(index, 1);
    localStorage.setItem("canape", JSON.stringify(productRegister));
    elt.remove();
   
  });
}*/
let article = document.querySelectorAll(".cart__item");
console.log(article);
for (let n = 0; n < article.length; n++) {
  const btnDelete = article[n].querySelector(".deleteItem");
  btnDelete.addEventListener("click", (e) => {
    console.log(n);
    const elt = e.target.closest("article");
    console.log(elt);
    const index = elt.dataset.index;
    console.log(index);
    productRegister.splice(index, 1);
    localStorage.setItem("canape", JSON.stringify(productRegister));
    elt.remove();
  });
  const btnAddProduct = article[n].querySelector(".itemQuantity");
  btnAddProduct.addEventListener("input", (e) => {
    console.log("input value", e.target.value);
    //on récupère l'index du produit dans le storage
    //on actualise la quantité
    //on actualise le total
    //on sauvegarde le localstorage
    const index = article[n].dataset.index;
    console.log(index);
    productRegister[index].quantityKanap = parseInt(e.target.value);
    localStorage.setItem("canape", JSON.stringify(productRegister));
    location.reload();
  });
}
