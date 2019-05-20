function call(pUrl, list) {
    $.ajax({
        url: pUrl,
        method: "GET",
        success: function (data) {
            var specie = data.results;
            Array.prototype.push.apply(list, specie);

            var specieString = JSON.stringify(list)
 
            localStorage.setItem('species', specieString)

            if (data.next !== null) {
                call(data.next, list);
            }
        },
        fail: function (error) {
            console.log(error)
        }
    });
}


if (localStorage.getItem('species')) {
 var speciesParse = JSON.parse(localStorage.getItem('species'));
  for (i = 0; i < speciesParse.length ; i++){
    var trNode = document.createElement('tr');

    var idNode = document.createElement('td');
        idNode.textContent = i + 1 ;   
        trNode.append(idNode);
 
    var nameNode = document.createElement('td');
        nameNode.textContent =  speciesParse[i].name ;   
        trNode.append(nameNode);

    var classNode = document.createElement('td');
        classNode.textContent = speciesParse[i].classification;
        trNode.append(classNode);
        
    var kindNode = document.createElement('td');
        kindNode.textContent = speciesParse[i].designation;
        trNode.append(kindNode);
    
    var lifespanNode = document.createElement('td');
        lifespanNode.textContent = speciesParse[i].average_lifespan;
        trNode.append(lifespanNode);

    var languageNode = document.createElement('td');
        languageNode.textContent = speciesParse[i].language;
        trNode.append(languageNode);

    
    var eraseButtonNode = document.createElement('td');
        button = document.createElement('button');
        button.className = 'btn btn-danger button2';
        button.textContent = 'Eliminar';
        button.dataset.id = speciesParse[i].name; 
        eraseButtonNode.append(button);
        trNode.append(eraseButtonNode);

        document.getElementById('tableBody').append(trNode);
  
    }      

}else{
 call('https://swapi.co/api/species/', [])
}


$(document).ready(function () {
    $('.button2').on('click', function () {

        var id = $(this).data('id');

      
        var speciesParse = JSON.parse(localStorage.getItem('species'));
        
        var species = speciesParse.filter(function (speciesParse) {
            return speciesParse.name !== id;
        });

        var speciesErased = JSON.stringify(species);
        localStorage.setItem('species', speciesErased);

        if (localStorage.getItem('species') === '[]') {
            localStorage.removeItem('species');
        }

        $(this).parent().parent().fadeOut(1000, function () {
            $(this).remove()
        })
    })
})