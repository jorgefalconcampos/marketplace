

if (localStorage.length === 0) {
  document.getElementById("carrito_titulo").innerHTML = "Aún no tienes artículos en tu carrito";
}
else {
  document.getElementById("carrito_titulo").innerHTML = `Hay 1 artículo en tu carrito`;
  const art = JSON.parse(localStorage.getItem("articulo"));

  document.getElementById("producto_accordion_title").innerHTML = "Artículo #1"
  console.log(art.descripcion)
  document.getElementById("producto_accordion-body").innerHTML = `${art.detalle} ($${art.precio} ${art.divisa})` 


}