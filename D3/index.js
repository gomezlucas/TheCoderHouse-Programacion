

var num1 = parseInt(prompt("Ingrese primer numero"));
var sign = prompt("Ingrese signo de la operacion");


do {
    var num2 = parseInt(prompt("Ingrese el segundo numero:"));

} while (sign === "/" && num2 === 0);

switch (sign) {
    case "+":
        result = num1 + num2;
        break;
    case "-":
        result = num1 - num2;
        break;
    case "*":
        result = num1 * num2;
        break;
    case "/":
        result = num1 / num2;
        break;
    default:
        alert("usted a ingresado una operacion invalida");
}


console.log("El resultado de la operacion es " + result)


