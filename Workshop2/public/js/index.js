// function (data, list ) , list.push (data.results, call(data.next, list))  
 
function call(pUrl, list) {
    $.ajax({
        url: pUrl,
        method: "GET",
        success: function (data) {
            var character = data.results;
            Array.prototype.push.apply(list, character);

            var characterstring = JSON.stringify(list)
 
            localStorage.setItem('characters', characterstring)

            if (data.next !== null) {
                call(data.next, list);
            }


        },
        fail: function (error) {
            console.log(error)
        }
    });
}

if (localStorage.getItem('characters')) {
    var characterParse = JSON.parse(localStorage.getItem('characters'));

     for (var i = 0; i < characterParse.length; i++) {

        var trNode = document.createElement('tr')

        var idNode = document.createElement('td');
        idNode.textContent = i + 1;
        trNode.append(idNode);

        var nameNode = document.createElement('td');
        nameNode.textContent = characterParse[i].name;
        trNode.append(nameNode);

        var genderNode = document.createElement('td');
        genderNode.textContent = characterParse[i].gender;
        trNode.append(genderNode);

        var heightNode = document.createElement('td');
        heightNode.textContent = characterParse[i].height / 100;
        trNode.append(heightNode);

        var weightNode = document.createElement('td');
        weightNode.textContent = characterParse[i].mass;
        trNode.append(weightNode)


        var eyeColorNode = document.createElement('td');
        eyeColorNode.textContent = characterParse[i].eye_color;
        trNode.append(eyeColorNode);

        var eraseButtonNode = document.createElement('td');


        var buttonNode = document.createElement('td');
        var button = document.createElement('button')
        button.className = 'btn btn-danger button2';
        button.textContent = 'Eliminar';
        button.dataset.id = characterParse[i].name; // en vez de I

        buttonNode.append(button);
        trNode.id = idNode.textContent;
        trNode.append(buttonNode);

        document.getElementById('tableBody').append(trNode)
    }

} else {
     call("https://swapi.co/api/people/", []);
}



 
$(document).ready(function () {
    $('.button2').on('click', function () {

        var id = $(this).data('id');

      
        var charactersParse = JSON.parse(localStorage.getItem('characters'));
        
        var characters = charactersParse.filter(function (charactersParse) {
            return charactersParse.name !== id;
        });

        var charactersErase = JSON.stringify(characters);
        localStorage.setItem('characters', charactersErase);

        if (localStorage.getItem('characters') === '[]') {
            localStorage.removeItem('characters');
        }

        $(this).parent().parent().fadeOut(1000, function () {
            $(this).remove()
        })
    })
})

 

 