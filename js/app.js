document.getElementById('txtbtn').addEventListener('click', cargarTXT);
document.getElementById('jsonbtn').addEventListener('click', cargarJSON);
document.getElementById('apibtn').addEventListener('click', cargarREST);
document.getElementById('buscarPokemon').addEventListener('click', buscarPokemon);
function cargarTXT(){
    fetch('datos.txt')
        .then(function(res){
            return res.text();
    })
    .then(function(empleados){
        document.getElementById('resultado').innerHTML = empleados;
    })
    .catch(function(error){
        console.log(error);
    });
}
function cargarJSON(){
    fetch('empleados.json')
        .then(function(res){
            return res.json();
        })
        .then(function(data){
            let html = '';
            data.forEach(function(empleado){
                html += `
                    <li>${empleado.nombre} ${empleado.puesto} </li>`; 
            })
            document.getElementById('resultado').innerHTML = html;
        })
        .catch(function(error){
            console.log(error);
        });
}
function cargarREST(){
    fetch('https://picsum.photos/list')
        .then(function(res){
            return res.json();
        })
        .then(function(imagenes){
            let html = '';

            imagenes.forEach(function(imagen){
                    html += `
                        <li>
                            <a target = "_blanck" href=" ${imagen.post_url}" >VerImagen </a>
                            ${imagen.author}
                        </li>
                        `;
            });
            document.getElementById('resultado').innerHTML = html;
        })
}

let pokemones = [];

function buscarPokemon(){

    let numero = document.getElementById('numeroPokemon').value;

    fetch(`https://pokeapi.co/api/v2/pokemon/${numero}`)
        .then(function(res){
            return res.json();
        })
        .then(function(pokemon){

            pokemones.push(pokemon);

            let html = '';

            pokemones.forEach(function(pokemon, indice){

                let tipo = '';

                pokemon.types.forEach(function(t){
                    tipo += t.type.name + ' ';
                });

                html += `
                    <div>
                        <h2>${pokemon.name}</h2>

                        <img src="${pokemon.sprites.front_default}" 
                             alt="${pokemon.name}">

                        <p><strong>Tipo:</strong> ${tipo}</p>
                        <p><strong>Altura:</strong> ${pokemon.height / 10} m</p>
                        <p><strong>Peso:</strong> ${pokemon.weight / 10} kg</p>

                        <button onclick="
                            pokemones.splice(${indice}, 1);
                            this.parentElement.remove();
                        ">
                            Eliminar
                        </button>
                    </div>

                    <hr>
                `;
            });

            document.getElementById('resultado').innerHTML = html;
        })
        .catch(function(error){

            document.getElementById('resultado').innerHTML =
                '<p>No se encontró ese Pokémon.</p>';

            console.log(error);
        });
}