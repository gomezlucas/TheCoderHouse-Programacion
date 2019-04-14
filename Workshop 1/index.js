// variable para bloquear el boton agregar estudiante
document.getElementById('addStudent').disabled = true;
showStudentsList();
$('.alertSuccess').hide();
$('.alertErased').hide();

// Defino la funcion creadora de Student 
function Student(firstName, lastName, dni, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dni = dni;
    this.email = email;
}

//Defino la funcion Agregar Estudiantes
function addStudent() {
    var studentsArray = [];
    var firstName = document.getElementById('firstName');
    var lastName = document.getElementById('lastName');
    var dni = document.getElementById('dni');
    var email = document.getElementById('email');
    var student1 = new Student(firstName.value,
        lastName.value,
        dni.value,
        email.value);

    if (localStorage.getItem('students')) {
        var studentsArray = JSON.parse(localStorage.getItem('students'));
    }

    studentsArray.push(student1);
    var studentsArrayString = JSON.stringify(studentsArray);
    localStorage.setItem('students', studentsArrayString);
    showStudentsList();
    formResetAddStudent();
    $('.alertSuccess').show();
    setTimeout(
        function () {
            $('.alertSuccess').hide();
        }
        , 1000);
}


//Evento Click dispara Funcion agregando estudiante
document.getElementById('addStudent').onclick = addStudent;


//Funcion que elimina estudiantes de la lista

function removeStudent() {
    var studentsremoved = document.getElementById('studentsremoved');
    if (localStorage.getItem('students')) {
        var studentsArray = JSON.parse(localStorage.getItem('students'));

        for (var i = 0; i < studentsArray.length; i++) {
            if (studentsremoved.value === studentsArray[i].dni) {
                var studentsremoved = studentsArray.splice(i, 1);
                var dniFound = true;
                break;
            }
        }
        if (dniFound) {
            var studentsArrayString = JSON.stringify(studentsArray);
            localStorage.setItem('students', studentsArrayString);
            showStudentsList();
            $('.alertErased').show();
            setTimeout(
                function () {
                    $('.alertErased').hide();
                }
                , 1000);
        }
    }
    document.getElementById('form__studentsremoved').reset();
}



// Funcion para Resetear el formulario AddStudent

function formResetAddStudent() {

    document.getElementById('addStudent').disabled = true;
    document.getElementById('form__addStudent').reset();
    var inputEmail = document.getElementById('email');
    inputEmail.classList.remove('is-valid');
    var inputDni = document.getElementById('dni');
    inputDni.classList.remove('is-valid');
    var inputFirstName = document.getElementById('firstName');
    firstNameNode.classList.remove('is-valid');
    mailOK = false;
    firstNameOK = false;
    dniOK = false;

}


//Evento Click dispara Funcion para eliminar estudiantes
document.getElementById('removeStudent').onclick = removeStudent;



//Defino funcion para buscar estudiantes
function searchStudent() {
    localStorage.removeItem('searched')
    var studentsArray = JSON.parse(localStorage.getItem('students'));
    var inputSearchStudent = document.getElementById('inputSearchStudent').value;
    var studentParse = [];

    for (var i = 0; i < studentsArray.length; i++) {

        if (studentsArray[i].firstName.indexOf(inputSearchStudent) >= 0 && inputSearchStudent) {


            var firstName = studentsArray[i].firstName;
            var lastName = studentsArray[i].lastName;
            var dni = studentsArray[i].dni
            var email = studentsArray[i].email;

            var student1 = new Student(firstName, lastName, dni, email);
 

            if (localStorage.getItem('searched')) {
                studentParse = JSON.parse(localStorage.getItem('searched'));
            }
            studentParse.push(student1);
            var StudentParseString = JSON.stringify(studentParse)
            localStorage.setItem('searched', StudentParseString);
            ShowStudentSearched();
            document.getElementById('form__studentSearched').reset();

        }


    }
}


//Codigo para guardar  Alumno buscado en Storage y mostrarlo en pantalla
function ShowStudentSearched(){ 
var studentsArraySearch = [];

 
while (document.querySelector('.studentsListSearched'))
 {
    var cleanScreen = document.querySelector('.studentsListSearched');
    cleanScreen.parentNode.removeChild(cleanScreen);
    console.log(cleanScreen)
}


if (localStorage.getItem('searched')) {
    var studentsArray = JSON.parse(localStorage.getItem('searched'));
    console.log(studentsArray)
    for (var i = 0; i < studentsArray.length; i++) {
        var studentLiNode = document.createElement('li');

        var studentH1Node = document.createElement('h1');
        studentH1Node.textContent = studentsArray[i].firstName + ' ' + studentsArray[i].lastName;
        studentLiNode.append(studentH1Node);

        var studentH3Node = document.createElement('h3');
        studentH3Node.textContent = studentsArray[i].dni;
        studentLiNode.append(studentH3Node);

        var studentPNode = document.createElement('p');
        studentPNode.textContent = studentsArray[i].email;
        studentLiNode.append(studentPNode);


        studentLiNode.className = 'studentsListSearched card';
        var studentsDisplay = document.getElementById('searchedStudentsDisplay').append(studentLiNode);


        setTimeout(function(){ 
            while (document.querySelector('.studentsListSearched'))
            {
               var cleanScreen = document.querySelector('.studentsListSearched');
               cleanScreen.parentNode.removeChild(cleanScreen);
               console.log(cleanScreen)
           }                  
        },2500);

    }
}
}

//Evento click dispara Funcion buscar alumno
document.getElementById('searchStudent').onclick = searchStudent;

//Evento onblur para checkear que campo Email sea correcto 
var mailOK = false;
var inputEmail = document.getElementById('email');
inputEmail.onblur = checkEmail;
function checkEmail(event) {
    var inputEmail = event.target;

    if (
        !inputEmail.value ||
        inputEmail.value.indexOf('@') === -1 ||
        inputEmail.value.indexOf('.') === -1
    ) {
        inputEmail.classList.remove('is-valid')
        inputEmail.classList.add('is-invalid')
    } else {
        inputEmail.classList.remove('is-invalid')
        inputEmail.classList.add('is-valid')
        mailOK = true;

        if (mailOK === true && dniOK === true && firstNameOK === true) {
            document.getElementById('addStudent').disabled = false;


        }
    }
}


//Evento onblur para checkear que campo DNI no este vacio y que no se encuentre en el storage

var dniOK = false;
var inputDni = document.getElementById('dni');
inputDni.onblur = checkDni;

function checkDni(event) {
    var dniNode = event.target;
    checkDnirepeat(dniNode.value);


    if (dniNode.value && dni.value > 0 && !(checkDnirepeat(dniNode.value))) {
        inputDni.classList.remove('is-invalid')
        inputDni.classList.add('is-valid')
        dniOK = true;
        if (mailOK === true && dniOK === true && firstNameOK === true) {
            document.getElementById('addStudent').disabled = false;
        }
    } else {
        inputDni.classList.remove('is-valid')
        inputDni.classList.add('is-invalid')
    }
}

function checkDnirepeat(dni) {
    studentsArray = [];
    var findDni = false;
    if (localStorage.getItem('students')) {
        studentsArray = JSON.parse(localStorage.getItem('students'));
        for (var i = 0; i < studentsArray.length; i++) {
            if (dni === studentsArray[i].dni) {
                console.log("lo encontro")
                findDni = true;
            }
        }
    } else {
        findDni = false;

    }
    return findDni;

}

//Evento onblur para chequear que campo nombre no este vacio

var inputFirstName = document.getElementById('firstName');
var firstNameOK = false;
inputFirstName.onblur = checkFirstName;

function checkFirstName(event) {
    firstNameNode = event.target;

    if (firstNameNode.value) {
        firstNameNode.classList.remove('is-invalid')
        firstNameNode.classList.add('is-valid')
        firstNameOK = true;
        if (mailOK === true && dniOK === true && firstNameOK === true) {
            document.getElementById('addStudent').disabled = false;
        }
    } else {
        firstNameNode.classList.remove('is-valid')
        firstNameNode.classList.add('is-invalid')
    }
}



//Muestra estudiantes en pantalla 
function showStudentsList() {
    while (document.querySelector('.studentsItem')) {
        var cleanScreen = document.querySelector('.studentsItem');
        cleanScreen.parentNode.removeChild(cleanScreen);
        console.log(cleanScreen)
    }
    if (localStorage.getItem('students')) {
        var studentsArray = JSON.parse(localStorage.getItem('students'));
        for (var i = 0; i < studentsArray.length; i++) {
            var studentLiNode = document.createElement('li');

            var studentH1Node = document.createElement('h1');
            studentH1Node.textContent = studentsArray[i].firstName + ' ' + studentsArray[i].lastName;
            studentLiNode.append(studentH1Node);

            var studentH3Node = document.createElement('h3');
            studentH3Node.textContent = studentsArray[i].dni;
            studentLiNode.append(studentH3Node);

            var studentPNode = document.createElement('p');
            studentPNode.textContent = studentsArray[i].email;
            studentLiNode.append(studentPNode);

            studentLiNode.className = 'studentsItem card';
            var studentsDisplay = document.getElementById('studentsList').append(studentLiNode);

        }
    } else {

        var studentLiNode = document.createElement('li');

        var studentH1Node = document.createElement('h1');
        studentH1Node.textContent = "No hay estudiantes cargados en Sistema";
        studentLiNode.append(studentH1Node);
        studentLiNode.className = 'studentsItem';
        var studentsDisplay = document.getElementById('studentsList').append(studentLiNode);
    }
}
