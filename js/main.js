//! Variables
const acumulador = [[], 0];
let listaTotal;
const productos = [];
let elemento = document.getElementById("compra");
let add1 = document.getElementById('add1');
let add2 = document.getElementById('add2');
let add3 = document.getElementById('add3');
let add4 = document.getElementById('add4');
let fin = document.getElementById('fin');
let reset = document.getElementById('reset');

//! Clase para agrupar características de un prodcto
class Producto {
    constructor (nombre, precio, cantidad) {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    };
    addCantidad (){
        this.cantidad ++;
    };
};

//! Arreglo para agrupar productos
productos.push(new Producto("Producto 1: $10", 10, 0));
productos.push(new Producto("Producto 2: $20", 20, 0));
productos.push(new Producto("Producto 3: $30", 30, 0));
productos.push(new Producto("Producto 4: $40", 40, 0));

//! Agregando productos a almacenamiento local
const guardarLocal = (clave, valor) => {localStorage.setItem(clave, valor)};
guardarLocal('listaProductos', JSON.stringify(productos));

//! Agregar elementos a lista
function click(add) {
    switch (add) {
        case add1:
            productos[0].addCantidad();
            sessionStorage.setItem('producto1', productos[0].cantidad);
            acumulador[0][0] = (`${productos[0].cantidad} ${productos[0].nombre}`);
            acumulador[1] = acumulador[1] + productos[0].precio;
            break;
        case add2:
            productos[1].addCantidad();
            sessionStorage.setItem('producto2', productos[1].cantidad);
            acumulador[0][1] = (`${productos[1].cantidad} ${productos[1].nombre}`);
            acumulador[1] = acumulador[1] + productos[1].precio;
            break;
        case add3:
            productos[2].addCantidad();
            sessionStorage.setItem('producto3', productos[2].cantidad);
            acumulador[0][2] = (`${productos[2].cantidad} ${productos[2].nombre}`);
            acumulador[1] = acumulador[1] + productos[2].precio;
            break;
        case add4:
            productos[3].addCantidad();
            sessionStorage.setItem('producto4', productos[3].cantidad);
            acumulador[0][3] = (`${productos[3].cantidad} ${productos[3].nombre}`);
            acumulador[1] = acumulador[1] + productos[3].precio;
            break;
        default:
            break;
    };
    console.log(acumulador[0]);
    console.log(acumulador[1]);
    listaTotal = "";
    for (let index = 0; index < acumulador[0].length; index++) {
        if (acumulador[0][index] == undefined) {
            continue;
        } else {
            listaTotal += acumulador[0][index] + "\n";
        };        
    };
    console.log(listaTotal);
    elemento.innerText = `Los productos agregados hasta ahora son:
                          ${listaTotal}
                          Y el total hasta ahora es de $${acumulador[1]}.`;
};

add1.onclick = () => {click(add1)};
add2.onclick = () => {click(add2)};
add3.onclick = () => {click(add3)};
add4.onclick = () => {click(add4)};

//! Mostrar y cargar elementos finales agregados
fin.onclick = () => {
    if (acumulador[1] == 0) {
        elemento.innerText = 'No eligió ningún producto.'; // contenido agregado a nueva elemento del HTML
    } else {
        compraFinal = JSON.stringify(acumulador)
        sessionStorage.setItem('compraFinal', compraFinal);
        elemento.innerText = `La lista final de productos es:
                              ${listaTotal}
                              Y el total final es de $${acumulador[1]}.`;
    };
};

//! Reiniciar/borrar datos
reset.onclick = () => {
    acumulador[0] = [];
    acumulador[1] = 0;
    for (let index = 0; index < productos.length; index++) {
        productos[index].cantidad = 0;        
    };
    sessionStorage.clear();
    elemento.innerText = '';
};