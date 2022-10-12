const card = document.getElementById("card");
const boton = document.getElementById("boton");
const botonVaciar = document.getElementById("BotonVaciar")



/* let moneda = prompt("Ingrese tipo de moneda a convertir a usd  (sólo monedas del mercosur)");
let cantidad = parseInt(prompt("Ingrese la cantidad que quiere convertir")); */

/* function conversion(moneda, cantidad) {
    switch (moneda) {
        case "ars":
            let totalArs = Math.round(cantidad / 280);
            return totalArs
            break;

        case "real":
            let totalReal = Math.round(cantidad * 0.19);
            return totalReal
            break;

        case "uyu":
            let totalUyu = Math.round(cantidad / 40.99);
            return totalUyu
            break;

        case "clp":
            let totalClp = Math.round(cantidad / 892.51);
            return totalClp
            break;

        case "bs":
            let totalBs = Math.round(cantidad / 6.92);
            return totalBs
            break;

        case "pyg":
            let totalPyg = Math.round(cantidad / 6093.65);
            return totalPyg
            break;
    }
}
while (moneda !== "ESC") {
    alert(`Ud está convirtiendo la cantidad de $ ${cantidad} ${moneda} y recibe la cantidad de  : 
    ${conversion(moneda, cantidad)} dolares`);
    moneda = prompt("Ingrese tipo de moneda a convertir a USD (solo monedas del mercosur)");
    if (moneda !== "ESC") {
        cantidad = parseInt(prompt("Ingrese la cantidad que quiere convertir"));
    } else {
        alert("Ud salio de la sección conversor de moneda")
    }
}
 */
class monedas {
    constructor(id, nombre, precio, imagen, rutaImagen) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = imagen;
        this.rutaImagen = rutaImagen;
    }
}
const moneda1 = new monedas(1, "ARS", 280.0, "PesosArgentinos", "./imagenes/pesos_ars.jpg")
const moneda2 = new monedas(2, "REAL", 0.19, "RealesBrasileños", "./imagenes/reales_br.jpg");
const moneda3 = new monedas(3, "UYU", 40.99, "PesosUruguayos", "./imagenes/pesos_uyu.jpg");
const moneda4 = new monedas(4, "CLP", 892.51, "PesosChilenos", "./imagenes/pesos_clp.jpg");
const moneda5 = new monedas(5, "BS", 6.92, "PesosBolivianos", "./imagenes/pesos_bs.jpg");
const moneda6 = new monedas(6, "PYG", 6093.65, "PesosParaguayos", "./imagenes/pesos_pyg.jpg");

const tipoMonedas = [];
tipoMonedas.push(moneda1, moneda2, moneda3, moneda4, moneda5, moneda6);

// -- filter: filtra todos los elementos que cumplan la condicion -- //
/* let monedaCotizada = prompt("Ingrese la moneda a consultar la cotizacion");
let filtrado = tipoMonedas.filter(item => item.name === monedaCotizada); */

//-- Recorre el array y se muestra si el ingreso cumple con la condicion -- //
/* filtrado.forEach((item) => {
    let mensaje = `El precio de la ${item.name} es de ${price.value} por dolar`;
    alert(mensaje);
})
 */

const carrito = []
tipoMonedas.forEach(producto => {
    let monedaRenderizada = document.createElement("div")
    monedaRenderizada.innerHTML = `
        <div class="card contenedor" style="width: 17rem">
            <img  class="card-img-top imagenMoneda"  src=${producto.rutaImagen} alt="...">
            <h5 class="card-title">${producto.nombre}</h5>            
            <div class="card-body">
                <p class="card-text">Precio $: ${producto.precio}</p>
                    <button class="btn btn-primary" id= ${producto.id}>Comprar </button>  
                    <button class="btn btn-primary" id= "eliminar ${producto.id}">Eliminar </button>    
            </div>
        </div>    
    `
    card.append(monedaRenderizada)
    const boton = document.getElementById(producto.id)
    boton.addEventListener("click", () => comprarMoneda(producto))
    const botonVaciar = document.getElementById(`eliminar ${producto.id}`)
    botonVaciar.addEventListener("click", () => eliminarMoneda(producto))
})
const comprarMoneda = (producto) => {
    let monedaExiste = carrito.find(item => item.id === producto.id)
    if (monedaExiste !== undefined) {
        monedaExiste.precio = monedaExiste.precio + producto.precio
        monedaExiste.cantidad = monedaExiste.cantidad +1
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            img: producto.imagen,
            rutaImagen: producto.rutaImagen,
            cantidad: 1,
        })
    }
}
const eliminarMoneda = (producto) => {
    let carrito = JSON.parse(localStorage.getItem("carrito"));
    carrito = carrito.find(item => item.nombre !== producto.nombre);
    localStorage.setItem("carrito", JSON.stringify(carrito))
};

/* const eliminarMoneda = (producto) => {
    let monedaExiste = carrito.find(item => item.id === producto.id)
    if (monedaExiste !== undefined) {
        monedaExiste.cantidad = monedaExiste.cantidad - 1
    }
}
 */

boton.addEventListener("click", () => console.log(carrito))


