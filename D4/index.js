
// Elimina acentos diacriticos, funcion extraida de la web https://es.stackoverflow.com/questions/62031/eliminar-signos-diacr%C3%ADticos-en-javascript-eliminar-tildes-acentos-ortogr%C3%A1ficos

function eliminarDiacriticosEs(texto) {
    return texto
        .normalize('NFD')
        .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi, "$1")
        .normalize();
}



// Busca alumnos 

function buscarAlumnos(par1, par2, studentsList) {
    for (var i = 0; i < studentsList.length; i++) {
 
        if ((eliminarDiacriticosEs(par1).toLowerCase() ===
            eliminarDiacriticosEs(studentsList[i].firstName).toLowerCase())
            &&
            (eliminarDiacriticosEs(par2).toLowerCase() ===
            eliminarDiacriticosEs(studentsList[i].lastName).toLowerCase() ) ) {
            salida = i;
            i = studentsList.lenght;
            
        } else {
            console.log(i);
            salida = -1
        }
    }
    return salida;
}

var studentsList = [
    {
        firstName: 'Juan',
        lastName: 'Pérez',
        dni: 45678987
    },
    {
        firstName: 'Ana',
        lastName: 'Fernandez',
        dni: 45678989
    },
    {
        firstName: 'Pedro',
        lastName: 'Mármol',
        dni: 45678956
    },
    {
        firstName: 'Pablo',
        lastName: 'Picapiedras',
        dni: 45678983
    }
]

name = prompt("Ingrese nombre del estudiante");
lastName = prompt("Ingrese apellido del estudiante");

buscarAlumnos(name, lastName, studentsList);

if (salida >= 0) {
    alert("Alumno   " + studentsList[salida].firstName + " " + studentsList[salida].lastName + " fue encontrado en la posicion " + salida);
} else {
    alert("Alumno no fue encontrado");
};

