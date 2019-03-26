

function includesText(par1, par2) {
    var findIt = false;
    if (typeof par1 === "string" && typeof par2 === "string") {
        if (par2.toUpperCase().indexOf(par1.toUpperCase()) >= 0) {
            findIt = true
        }
    }
    return findIt

}

var word1 = prompt("ingrese el primer palabra a comparar");
var word2 = prompt("ingrese la segunda palabra a comparar");

var result = includesText(word1, word2);
console.log(result);

if (result === true) {
    alert("Se encuentra incluido")
} else {
    alert("No se encuentra incluido)
}
