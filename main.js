
/** *
 Problema: El usuario puede agregar al carrito uno o varios artículos, y se debe mostrar
 el total de todos los artículos
 * */ 

const IVA = 16;
let articulos_disponibles = [];
let articulos = []; // articulos que el usuario agrega al carrito
let total = 0;
let terminar = false;


class Articulo {
    constructor(id, sku, nombre, precio, impuestos, descripcion) {
        this.id = id;
        this.sku = sku;
        this.nombre = nombre;
        this.precio = precio;
        this.impuestos = impuestos;
        this.descripcion = descripcion;
        // this.cantidad = 0;
    }

    agregar(cantidad) {
        this.cantidad = cantidad;
    }
}

class Carrito {
    constructor(articulos, tieneDescuento, descuento) {
        this.articulos = articulos;
        this.tieneDescuento = tieneDescuento;
        this.descuento = descuento;
    }
}

let articulo_1 = new Articulo(123, "P00JHDGNB132", "Alebrije de león", 100, IVA, "Alebrije de Oaxaca hecho a mano, tallado en madera  y pintado con finos detalles.")
let articulo_2 = new Articulo(487, "AP826MSNDGN2", "Alebrije de toro", 320, IVA, "Alebrije hecho a mano, tallado en madera  y pintado con colores brillantes.")

articulos_disponibles.push(articulo_1, articulo_2);

function preguntarCliente() {

    const longitud = articulos_disponibles.length;

    alert(`Actualmente, tenemos a la venta ${longitud} artículos especiales:`);

    for (let item=0; item<longitud; item++){
        alert(`Artículo ${item+1}: \n\n ${JSON.stringify(articulos_disponibles[item])}`);
    }

    let articulo = Number(prompt(`¿Qué artcículo de los ${longitud} deseas agregar?`));

    switch(articulo) {
        case 1:
            articulos.push(articulo_1);
            alert(`¡El ${articulo_1["nombre"]} es una buena elección!`);
        break;

        case 2:
            articulos.push(articulo_2);
            alert(`¡El ${articulo_2["nombre"]} es una buena elección!`);
        break;

        default:
            alert("Al parecer no has agregado artículos a tu carrito o esta opción no está disponible...")
        break;
    }

    
    const carrito = new Carrito(articulos, false, 0); // no crear un nuevo carrito, si no verificar si existe uno y agregarlo
    
    alert("Tu carrito se ve así hasta ahora: ");

    console.log(carrito)

    for(let art=0; art<carrito["articulos"].length; art++){
        alert(JSON.stringify(carrito["articulos"][art]));
    }

    total = 0; // solucionado "reiniciando" el total

    for(let item=0; item<carrito["articulos"].length; item++){
        total += carrito["articulos"][item].precio; // una vez reiniciado, se hace la suma
    }

    alert("Tu total es de: " + total)

    terminar = JSON.parse(prompt("¿Deseas finalizar? (escribe 'false' sin comillas para agregar otro, o 'true' para finalizar)"));

}

let nombre = prompt("¡Hola! ¿Me puedes dar tu nombre?");
alert(`Hola ${nombre}, estamos encantados de tenerte en nuestra tienda.`)


while(terminar === false) {
    preguntarCliente();
}


