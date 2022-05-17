//! Variables
let acumulador = [[], 0, 0]; // [lista de productos agregados, importe total, cantidad total]
const productos = []; // arreglo de objetos 'Producto'
let filas = []; // arreglo para crear filas en tabla de HTML
let compra = document.getElementById("compra");
const add = [
    document.getElementById('add1'),
    document.getElementById('add2'),
    document.getElementById('add3'),
    document.getElementById('add4')
];
let fin = document.getElementById('fin');
let reset = document.getElementById('reset');
let tabla = document.getElementById('tabla');
let total = document.createElement('p');
let final = document.getElementById('final');

// trayendo datos externos
async function arreglar() {
    const resp = await fetch('./js/datos.json');
    const data = await resp.json();
    data.forEach(producto => {
        productos.push(producto)
    });
    console.log(productos);
};
arreglar();

//! Agregar un elemento (agrega los datos de un elemento al arreglo 'acumulador')
function agregar(i, [a, b, c]) {
    productos[i].cantidad++;
    sessionStorage.setItem('producto'+(i+1), productos[i].cantidad);
    a[i] = (`${productos[i].nombre}`);
    b += productos[i].precio;
    c++;
    return acumulador = [a, b, c];
};

//! Agregar un elemento al HTML (muestra en el HTML cada elemento agregado) 
function click(agregando) {
    for (let index = 0; index < add.length; index++) {
        switch (agregando) {
            case add[index]:
                agregar(index,acumulador);
            break;
        };
    };
        
    for (let index = 0; index < acumulador[0].length; index++) {
        if (acumulador[0][index] == undefined) {
            continue;
        } else {
            if (productos[index].agregado == true) {
                productos[index].agregado = false;
                filas[index] = document.createElement('tr');
                filas[index].innerHTML = `<td>${acumulador[0][index]}</td>
                                          <td>${productos[index].cantidad}</td>
                                          <td>${productos[index].precio * productos[index].cantidad}</td>`;
                tabla.append(filas[index]);
            } else {
                filas[index].innerHTML = `<td>${acumulador[0][index]}</td>
                                          <td>${productos[index].cantidad}</td>
                                          <td>${productos[index].precio * productos[index].cantidad}</td>`;
                tabla.append(filas[index]);
            };
        };  
    };
    total.innerHTML = `El importe total final es de <b>$${acumulador[1]}</b>.`;
    compra.append(total);
}; 

//! Agregando productos a almacenamiento local
const guardarLocal = (clave, valor) => {localStorage.setItem(clave, valor)};
guardarLocal('listaProductos', JSON.stringify(productos));

//! LLamando a la función 'click'
for (let index = 0; index < add.length; index++) {
    add[index].onclick = () => {click(add[index])};
};

//! Cargar elementos finales agregados
fin.onclick = () => {
    if (acumulador[1] == 0) {
        Swal.fire({
            title: 'Error',
            text: 'No eligió ningún producto',
            icon: 'error',
            iconColor: 'red',
            confirmButtonText: 'Ok'
        });
    } else {
        Swal.fire({
            title: 'Finalizar compra',
            text: 'El importe final es de $' + acumulador[1] + '. ¿Está seguro que desea finalizar la compra?',
            icon: 'question',
            iconColor: 'blue',
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: 'Sí',
            confirmButtonColor: 'green',
            cancelButtonText: 'No',
            cancelButtonColor: 'red'
        }).then ((response) => {
            if (response.isConfirmed) {
                Swal.fire({
                    title: 'Compra Confirmada',
                    icon: 'success',
                    iconColor: 'green',
                    confirmButtonText: 'Ok'
                });
                compraFinal = JSON.stringify(acumulador)
                sessionStorage.setItem('compraFinal', compraFinal);
                final.innerText = 'Compra efectuada.';
            } else {
                Swal.fire({
                    title: 'Continúa con la compra',
                    icon: 'info',
                    confirmButtonText: 'Ok'
                });
            };
        });
    };
};

//! Reiniciar/borrar datos
reset.onclick = () => {
    Swal.fire({
        title: 'Reiniciar compra',
        text: '¿Está seguro que desea reiniciar la compra?',
        icon: 'question',
        iconColor: 'blue',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Sí',
        confirmButtonColor: 'green',
        cancelButtonText: 'No',
        cancelButtonColor: 'red'
    }).then ((response) => {
        if (response.isConfirmed) {
            Swal.fire({
                title: 'Reinicio Confirmado',
                icon: 'success',
                iconColor: 'green',
                confirmButtonText: 'Ok'
            });
            acumulador = [[], 0, 0];
            for (let index = 0; index < productos.length; index++) {
                productos[index].cantidad = 0;   
            };
            for (let index = 0; index < filas.length; index++) {
                if (filas[index] == undefined) {
                    continue;
                } else {
                  filas[index].innerText = "";  
                };                
            };
            sessionStorage.clear();
            total.innerHTML = "";
        } else {
            Swal.fire({
                title: 'Reinicio Cancelado',
                icon: 'info',
                confirmButtonText: 'Ok'
            });
        };
    });
};