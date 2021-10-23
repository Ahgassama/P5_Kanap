var str = "http://localhost:3000/api/products";
var url = new URL(str);
var name = url.searchParams.get("name");
console.log(name);
