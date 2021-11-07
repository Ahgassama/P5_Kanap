//Déclaration de la varibale "productRegister"dans laquelle on a l'id , la quantité et la couleur
let productRegister = JSON.parse(localStorage.getItem("canape"));
console.log(productRegister);

//Affichage des produits du panier
//Sélection de la classe ou injecter le code html

const positionElement = document.querySelector("#cart__items");
console.log(positionElement);

if (productRegister.length !== 0) {
  let productPanier = [];

  for (a = 0; a < productRegister.length; a++) {
    productPanier =
      productPanier +
      `<article class="cart__item" data-id="{product-ID}">
   <div class="cart__item__img">
     <img src="${productRegister.imageUrl}" alt="Photographie d'un canapé">
   </div>
   <div class="cart__item__content">[]
     <div class="cart__item__content__titlePrice">
       <h2>${productRegister[a].nameKanap}</h2>
       <p>42,00 €</p>
     </div>
     <div class="cart__item__content__settings">
       <div class="cart__item__content__settings__quantity">
         <p>Qté : </p>
         <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
       </div>
       <div class="cart__item__content__settings__delete">
         <p class="deleteItem">Supprimer</p>
       </div>
     </div>
   </div>
 </article>`;
  }
  if (a == productRegister.length) {
    positionElement.innerHTML = productPanier;
  }
} else {
  console.log("je  suis vide");
}
