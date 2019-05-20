function call(pUrl, list) {
    $.ajax({
        url: pUrl,
        method: "GET",
        success: function (data) {
            var planets = data.results;
            Array.prototype.push.apply(list, planets);

            var planetsString = JSON.stringify(list)
 
            localStorage.setItem('planets', planetsString)

            if (data.next !== null) {
                call(data.next, list);
            }
        },
        fail: function (error) {
            console.log(error)
        }
    });
}



if (localStorage.getItem('planets')) {

    planetsParse = JSON.parse(localStorage.getItem('planets'))

    for (var i = 0; i < planetsParse.length; i++) {
        trNode = document.createElement('tr');

        idNode = document.createElement('td');
        idNode.textContent = i + 1;
        trNode.append(idNode);

        nameNode = document.createElement('td');
        nameNode.textContent = planetsParse[i].name;
        trNode.append(nameNode);

        diameterNode = document.createElement('td');
        diameterNode.textContent = planetsParse[i].diameter;
        trNode.append(diameterNode);

        rotationNode = document.createElement('td');
        rotationNode.textContent = planetsParse[i].rotation_period;
        trNode.append(rotationNode);

        /*  traslationNode = document.createElement('td');
          traslationNode.textContent = planetsParse[i].orbital_period;
          trNode.append(traslationNode);*/

        climateNode = document.createElement('td');
        climateNode.textContent = planetsParse[i].climate;
        trNode.append(climateNode);

        populationNode = document.createElement('td');
        populationNode.textContent = planetsParse[i].population;
        trNode.append(populationNode);

        eraseButtonNode = document.createElement('td');
        button = document.createElement('button');
        button.className = 'btn btn-danger button2';
        button.textContent = 'Eliminar';
        button.dataset.id = planetsParse[i].name;
        eraseButtonNode.append(button);
        trNode.append(eraseButtonNode);

        document.getElementById('tableBody').append(trNode);

    }

} else {

    call('https://swapi.co/api/planets/', []);

}



$(document).ready(function () {
    $('.button2').on('click', function () {

        var id = $(this).data('id');

        var planetsParse = JSON.parse(localStorage.getItem('planets'));

        var planets = planetsParse.filter(function (planetsParse) {
            return planetsParse.name !== id;
        });

        var planetsErased = JSON.stringify(planets);
        localStorage.setItem('planets', planetsErased);

        if (localStorage.getItem('planets') === '[]') {
            localStorage.removeItem('planets');
        }

        $(this).parent().parent().fadeOut(1000, function () {
            $(this).remove()
        })
    })
})