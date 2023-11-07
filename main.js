const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonDetail = document.getElementById('pokemonDetail')

const maxRecords = 151;
const limit = 10;
let offset = 0;


function convertPokemonToli(pokemon) {
    return `
        <li class="pokemon ${
            pokemon.type
            }" id="pokemon" onClick=redirectToPokemonDetails(${pokemon.number})>
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>   
            
            <div class="detail">
                <ol class="types">
                 ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                 </ol>

                <img src="${pokemon.photo}" 
                    alt="${pokemon.name}">
            </div>
        </li>
    `
}



function loadPokemonItens(offset, limit) {
    pokeApi.getpokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToli).join('')
        pokemonList.innerHTML += newHtml
    })
}


loadPokemonItens(offset, limit)



loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordNexPage = offset + limit

    if (qtdRecordNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function redirectToPokemonDetails(pokemon) {
    window.location.href = `/detalhes.html?pokemon=${pokemon}`;
}

