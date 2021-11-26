//Récupérer les données de l'API avec fetch
fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((response) => {
    //Création de la variable pour créer les éléments
    let html = "";
    //Boucle pour récupérer chaque produit
    for (let i = 0; i < response.length; i++) {
      html += displayProduct(response[i]);
    }

    document.getElementById("items").innerHTML = html;
  });
//fonction pour afficher les canapés de la page d'accueil
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
