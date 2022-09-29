let moneda = prompt("Ingrese tipo de moneda a convertir a usd  (sólo monedas del mercosur)");
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

/* const cotizacionMonedas = [
    { moneda: "ARS", precio: 280.0 },
    { moneda: "REAL", precio: 0.19 },
    { moneda: "UYU", precio: 40.99 },
    { moneda: "CLP", precio: 892.51 },
    { moneda: "BS", precio: 6.92 },
    { moneda: "PYG", precio: 6093.65 },
]; */


class monedas {
    constructor(nombreMoneda, valor) {
        this.name = nombreMoneda;
        this.value = valor;
    }
}

const moneda1 = new monedas("ARS", 280.0);
const moneda2 = new monedas("REAL", 0.19);
const moneda3 = new monedas("UYU", 40.99);
const moneda4 = new monedas("CLP", 892.51);
const moneda5 = new monedas("BS", 6.92);
const moneda6 = new monedas("PYG", 6093.65);


// filter: filtra todos los elementos que cumplan la condicion
let monedaCotizada = prompt("Ingrese la moneda a consultar la cotizacion");
let filtrado = monedas.filter(item => item.name === monedaCotizada);

filtrado.forEach((item) => {
    let mensaje = `El precio de la ${item.name} es de ${item.value} por dolar`;
    alert(mensaje);
})

