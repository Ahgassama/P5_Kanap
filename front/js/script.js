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
