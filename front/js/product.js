import { getParamFromUrl } from "./functions.js";
//Récupération dans l'url de l'ID du produit sélectionné dans la page Accueil
const id = getParamFromUrl("id");

//Récupération du produit avec l'id depuis l'API
fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((response) => {
    let html = "";
    html += displayDetailedProduct(response);
    document.getElementById("item").innerHTML = html;
    addListeners(id, response.name, response.price, response.imageUrl);
  });
//Affichage du produit
function displayDetailedProduct(response) {
  return ` 
  <article>
  <div class="item__img">
    <img src="${response.imageUrl}" alt="Photographie d'un canapé">
  </div>
  <div class="item__content" id="item__content">
    <div class="item__content__titlePrice">
      <h1 id="title">${response.name}</h1>
      <p>
        Prix : <span id="price">${response.price}</span>€
      </p>
    </div>
    <div class="item__content__description">
      <p class="item__content__description__title">Description :</p>
      <p id="description">
        ${response.description}
      </p>
    </div>
    <div class="item__content__settings">
      <div class="item__content__settings__color">
        <label for="color-select">Choisir une couleur :</label>
        <select name="color-select" id="colors">
        <option value="">--SVP, choisissez une couleur --</option>
        ${response.colors
          .map((color) => "<option>" + color + "</option>")
          .join("")}
        </select>
      </div>
      <div class="item__content__settings__quantity">
        <label for="itemQuantity"
          >Nombre d'article(s) (1-100) :</label
        >
        <input
          type="number"
          name="itemQuantity"
          min="1"
          max="100"
          value="0"
          id="quantity"
        />
      </div>
    </div>
    <div class="item__content__addButton">
      <button id="addToCart">Ajouter au panier</button>
    </div>
  </div>
</article>
 `;
}
//Ecoute du click pour l'ajout du produit dans le panier
function addListeners(id, name, price, imageUrl) {
  let cartBtn = document.querySelector("#addToCart");

  cartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const selectColor = getSelectedColor(document.getElementById("colors"));

    const quantityKanap = getQuantity(document.getElementById("quantity"));
    if (quantityKanap > 0 && selectColor) {
      let productItem = {
        selectColor,
        quantityKanap,
        id,
        nameKanap: name,
        price: price,
        imageUrl: imageUrl,
      };
      addProductToCart(productItem);
    }
  });
}
//Sélection de la couleur
function getSelectedColor(selector) {
  if (!selector.value) {
    alert("Veuillez choisir une couleur svp");
    return;
  }
  alert("Vous avez choisi la couleur : " + selector.value);
  return selector.value;
}
//Sélection de la quantité
function getQuantity(selector) {
  const quantity = parseInt(selector.value);
  if (quantity === 0) {
    alert("Merci de spécifier le nombre de canapé que vous souhaitez");
    return;
  }
  return quantity;
}
//Ajout produit dans le panier
function addProductToCart(productItem) {
  //Création du tableau dans la variable
  let productRegister = [];
  let otherProduct = true;
  //Si le localstorage est vide, créé un nouveau tableau productRegister et l'enregistrer
  if (localStorage.getItem("canape") === null) {
    productRegister.push(productItem);
    localStorage.setItem("canape", JSON.stringify(productRegister));
    //Sinon récupérer le tableau du localstorage , y ajouter le nouveau produit et mettre à jour le tableau
  } else {
    productRegister = JSON.parse(localStorage.getItem("canape"));

    productRegister.forEach((j) => {
      if (productItem.id == j.id && productItem.selectColor == j.selectColor) {
        j.quantityKanap += productItem.quantityKanap;
        otherProduct = false;
      }
    });
    if (otherProduct) productRegister.push(productItem);
    localStorage.setItem("canape", JSON.stringify(productRegister));
  }
}
