

/* let moneda = prompt("Ingrese tipo de moneda a convertir a usd  (sólo monedas del mercosur)");
let cantidad = parseInt(prompt("Ingrese la cantidad que quiere convertir"));

function conversion(moneda, cantidad) {
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

const card = document.getElementById("card");
class monedas {
    constructor(id,nombreMoneda, valor,nombreImagen,rutaImagen) {
        this.id = id
        this.name = nombreMoneda;
        this.price = valor;
        this.img = nombreImagen;
        this.rutaImagen = rutaImagen;
    }
}
const moneda1 = new monedas(1,"ARS", 280.0,"PesosArgentinos","./imagenes/pesos_ars.jpg")
const moneda2 = new monedas(2,"REAL", 0.19,"RealesBrasileños","./imagenes/reales_br.jpg");
const moneda3 = new monedas(3,"UYU", 40.99, "PesosUruguayos","./imagenes/pesos _uyu1.jpg");
const moneda4 = new monedas(4,"CLP", 892.51,"PesosChilenos","./imagenes/pesos_clp.jpg");
const moneda5 = new monedas(5,"BS", 6.92,"PesosBolivianos","./imagenes/pesos _bs.jpg");
const moneda6 = new monedas(6,"PYG", 6093.65,"PesosParaguayos","./imagenes/pesos_pyg.jpg");

const tipoMonedas = [];
tipoMonedas.push(moneda1, moneda2, moneda3, moneda4, moneda5, moneda6);

// -- filter: filtra todos los elementos que cumplan la condicion -- //
/* let monedaCotizada = prompt("Ingrese la moneda a consultar la cotizacion");
let filtrado = tipoMonedas.filter(item => item.name === monedaCotizada); */

tipoMonedas.forEach(item =>{
    let monedaRenderizada = document.createElement("div")
    monedaRenderizada.innerHTML = `
    <h5 class="card-title"> ${item.nombreMoneda}</h5>
    <span class="valor"> valor: $${item.valor}</span>
    <img class="imagenMoneda"> src="${item.rutaImagen}"</img>
    `
    card.append(monedaRenderizada)
})

//-- Recorre el array y se muestra si el ingreso cumple con la condicion -- //
/* filtrado.forEach((item) => {
    let mensaje = `El precio de la ${item.name} es de ${price.value} por dolar`;
    alert(mensaje);
})
 */
