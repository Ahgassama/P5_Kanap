/*(async function () {
  const productId = getProductId();
  console.log(productId);
});

function getProductId() {
  new URL(location.href).searchParams.get("id");
}

function getProduct() {
  document.getElementById("title").textContent = "name";
}
*/

const params = new URLSearchParams(document.location.search);
const id = params.get("id");

fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((response) => {
    console.log(response);
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
    console.log(cartBtn);

    cartBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const selectColor = document.getElementById("colors").value;
      console.log(selectColor);
      const quantityKanap = document.getElementById("quantity").value;
      console.log(quantityKanap);
      console.log(id);
      if (!selectColor) {
        alert("Veuillez choisir une couleur");
        return;
      } else {
        alert("Vous avez choisi la couleur : " + selectColor);
      }
    });
  });

/*const selectElt = document.querySelector("#colors");
console.log(selectElt);*/

/*
}*/

/*const selectElt = document.querySelector("#colors");
console.log(selectElt);*/
