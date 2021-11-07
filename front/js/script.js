/*const url = "http://localhost:3000/api/products";

let requete = new XMLHttpRequest();
requete.open("GET", url);
requete.responseType = "json";
requete.send();
console.log(url);
*/
/*requete.onload = function () {
  if (requete.readyState === XMLHttpRequest.DONE) {
    if (requete.status === 200) {
      let reponse = requete.response;
      console.log(reponse);
      let canape = reponse.name;
      document.getElementById("titles").textContent = canape;
    } else {
      alert("un problème est survenu");
    }
  }
};
*/
/*async function getDataFrom(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

getDataFrom(url).then((data) => {
  console.log(data);
});
console.log("Hello");*/
//Appel de la page API Produits
fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((response) => {
    console.log(response);

    let html = "";

    for (let i = 0; i < response.length; i++) {
      console.log(response[i].name);

      html += displayProduct(response[i]);
    }

    document.getElementById("items").innerHTML = html;
  });
//Affichage des éléments de l'API sur la page du site
function displayProduct(product) {
  return `
    <a  href="./product.html?id=${product._id}" >
    <article >
    <img src="${product.imageUrl}" alt="${product.altTxt}">
    <h3 class ="productName">${product.name}</h3>
    
    <p class="productDescription">${product.description}</p>
    </article>
    </a>`;
}
