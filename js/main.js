//! Variables
let lista = [];
let suma = 0;
let listaTotal;
let prod = parseInt(prompt('Ingrese el número correspondiente al producto que desea comprar: \n\n 1- Producto 1: $10 \n 2- Producto 2: $20 \n 3- Producto 3: $30 \n 4- Producto 4: $40 \n 0- Ninguno (finaliza el programa)'));
const productos = [];
let parrafo = document.createElement('p'); // creando nuevo elemento para el HTML
document.body.append(parrafo); // agregando el elemento al HTML

//! Clase para agrupar características de un prodcto
class Producto {
    constructor (nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    };
};

//! Función para agregar producto a la lista
function list(prod) {
    for (let index = 0; index < productos.length; index++) {
        if (index == prod - 1) {
            lista.push(productos[index].nombre);
        };
    };
     return lista;
};

//! Función para sumar precio del producto elegido
function carrito(prod) {
    for (let index = 0; index < productos.length; index++) {
        if (index == prod - 1) {
            suma = suma + productos[index].precio;
        };
    };
     return suma;
};

//! Arreglo para agrupar productos
productos.push(new Producto("Producto 1: $10", 10));
productos.push(new Producto("Producto 2: $20", 20));
productos.push(new Producto("Producto 3: $30", 30));
productos.push(new Producto("Producto 4: $40", 40));

//! Condicional de fin de programa
if (prod == 0) {
    parrafo.innerText = 'No eligió ningún producto. Fin del programa.'; // contenido agregado a nueva elemento del HTML
} else {
    //! Ciclo while para agregar productos al carrito
    while ((prod != 0)) {
        //! Condicional para limitar ingresos a opciones válidas
        if (prod >=5) {
            prod = parseInt(prompt('No ingresó una opción válida. Vuelva a ingresar un número'));
        } else {
            suma = carrito(prod);
            lista = list(prod);
            console.log(lista);
            listaTotal = "";
            for (let index = 0; index < lista.length; index++) {
                listaTotal += lista[index] + "\n";
            };
            console.log(listaTotal);
            alert('Los productos agregados hasta ahora son:\n' + listaTotal + '\nY el total hasta ahora es de $' + suma + '.');
            prod = parseInt(prompt('Ingrese el número correspondiente al producto que desea comprar: \n\n 1- Producto 1: $10 \n 2- Producto 2: $20 \n 3- Producto 3: $30 \n 4- Producto 4: $40 \n 0- Ninguno (finaliza el programa)'));
        };
    };
    parrafo.innerText = 'La lista final de productos es:\n' + listaTotal + '\nY el total final es de $' + suma + '.\n\nFin del programa.'; // contenido agregado a nueva elemento del HTML
};