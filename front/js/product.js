import { getParamFromUrl } from "./functions.js";

const id = getParamFromUrl("id");

fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((response) => {
    let html = "";

    html += ` 
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
    document.getElementById("item").innerHTML = html;
    let cartBtn = document.querySelector("#addToCart");

    cartBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const selectColor = document.getElementById("colors").value;

      const quantityKanap = parseInt(document.getElementById("quantity").value);

      if (!selectColor) {
        alert("Veuillez choisir une couleur svp");
        return;
      } else {
        alert("Vous avez choisi la couleur : " + selectColor);
      }

      if (quantityKanap == 0) {
        alert("Merci de spécifier le nombre de canapé que vous souhaitez");
      }
      let productItem = {
        selectColor,
        quantityKanap,
        id,
        nameKanap: response.name,
        price: response.price,
        imageUrl: response.imageUrl,
      };

      let productRegister = [];
      let otherProduct = true;

      if (localStorage.getItem("canape") === null) {
        productRegister.push(productItem);
        localStorage.setItem("canape", JSON.stringify(productRegister));
      } else {
        productRegister = JSON.parse(localStorage.getItem("canape"));

        productRegister.forEach((j) => {
          if (id == j.id && selectColor == j.selectColor) {
            j.quantityKanap += quantityKanap;
            otherProduct = false;
          }
        });
        if (otherProduct) productRegister.push(productItem);
        localStorage.setItem("canape", JSON.stringify(productRegister));
      }
    });
  });
