let productRegister = JSON.parse(localStorage.getItem("canape"));
console.log(productRegister);

//Affichage des produits du panier
//Sélection de la classe ou injecter le code html

const positionElement = document.querySelector("#cart__items");
displayItem();
//console.log(positionElement);
function displayItem() {
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
       <p class="itemTotal">${
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

    displayTotal();
  } else {
    console.log("je  suis vide");
  }
}

function displayTotal() {
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
}

let itemQuantity = document.querySelector(".itemQuantity");

//Suppression article

let article = document.querySelectorAll(".cart__item");
console.log(article);
for (let n = 0; n < article.length; n++) {
  const btnDelete = article[n].querySelector(".deleteItem");
  btnDelete.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(n);
    const elt = e.target.closest("article");
    console.log(elt);
    const index = elt.dataset.index;
    console.log(index);
    productRegister.splice(index, 1);
    localStorage.setItem("canape", JSON.stringify(productRegister));
    elt.remove();
    displayTotal();
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
    console.log(article[n]);
    article[n].querySelector(".itemTotal").innerHTML = `${
      productRegister[index].quantityKanap * productRegister[index].price
    }euros`;
    //location.reload();
    displayTotal();
    //displayItem();
  });
}

//---------Partie Formulaire

const btnSendForm = document.querySelector("#order");
btnSendForm.addEventListener("click", (e) => {
  e.preventDefault();
  //Récupérer les valeurs du formulaire
  const contact = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value,
  };
  //Controle validation formulaire

  const regexPrenomNomVille = (value) => {
    return /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/.test(value);
  };
  firstNameControl();
  lastNameControl();
  cityControl();
  addressControl();
  emailControl();
  function emailControl() {
    const mail = contact.email;
    if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/.test(mail)) {
      return true;
    } else {
      const errorMsg = "Merci de transmettre des données valides";
      const displayError = document.querySelector("#emailErrorMsg");
      displayError.innerHTML = errorMsg;
      return false;
    }
  }
  function firstNameControl() {
    const firstName = contact.firstName;
    if (regexPrenomNomVille(firstName)) {
      return true;
    } else {
      const errorMsg = "Merci de transmettre des données valides";
      const displayError = document.querySelector("#firstNameErrorMsg");
      displayError.innerHTML = errorMsg;
      return false;
    }
  }
  function lastNameControl() {
    const lastName = contact.lastName;
    if (regexPrenomNomVille(lastName)) {
      return true;
    } else {
      const errorMsg = "Merci de transmettre des données valides";
      const displayError = document.querySelector("#lastNameErrorMsg");
      displayError.innerHTML = errorMsg;
      return false;
    }
  }
  function cityControl() {
    const city = contact.city;
    if (regexPrenomNomVille(city)) {
      return true;
    } else {
      const errorMsg = "Merci de transmettre des données valides";
      const displayError = document.querySelector("#cityErrorMsg");
      displayError.innerHTML = errorMsg;
      return false;
    }
  }
  function addressControl() {
    const adress = contact.address;
    if (/^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/.test(adress)) {
      return true;
    } else {
      const errorMsg = "Merci de transmettre des données valides";
      const displayError = document.querySelector("#addressErrorMsg");
      displayError.innerHTML = errorMsg;
      return false;
    }
  }
  if (
    firstNameControl() &&
    lastNameControl() &&
    cityControl() &&
    addressControl() &&
    emailControl()
  ) {
    localStorage.setItem("formulaireValues", JSON.stringify(contact));
    //Envoyer le formulaire et les produits sélectionnés vers l'API
    const products = productRegister.map((product) => product.id);
    const toSend = {
      products,
      contact,
    };
    console.log(toSend);

    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(toSend),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        localStorage.setItem("order", JSON.stringify(response));
        document.location.href =
          "confirmation.html?orderId=" + response.orderId;
        console.log(response);
      });
  }
  /*if (lastNameControl()) {
    localStorage.setItem("formulaireValues", JSON.stringify(formulaireValues));
  } else {
   
  }

  if (emailControl()) {
    localStorage.setItem("formulaireValues", JSON.stringify(formulaireValues));
  } else {
  
  }

  if (cityControl()) {
    localStorage.setItem("formulaireValues", JSON.stringify(formulaireValues));
  } else {

  }

  if (addressControl()) {
    localStorage.setItem("formulaireValues", JSON.stringify(formulaireValues));
  } else {
   
  }*/
  //Mettre l'ensemble des valeurs dans le localstorage
});
