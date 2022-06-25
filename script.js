let clique, cliqueDois, cliqueTres, newinput, lista, fim;
setInterval(buscarNomeAPI,3000);
enviarNomeAPI();



function clicarIniciar() {
    clique = document.querySelector(`.entrada`);
    cliqueDois = document.querySelector(`.entradadois`);
    if (clique !== undefined) {
        clique.classList.add(`escondido`);
        cliqueDois.classList.remove(`escondido`);
        doisTempos();
    }
}

function doisTempos() {
    setTimeout(tresTempos,4000)
}

function tresTempos() {
    cliqueTres = document.querySelector(`.principal`)
    if (cliqueDois !== undefined) {
        cliqueDois.classList.add(`escondido`);
        cliqueTres.classList.remove(`escondido`);
    }
}

function enviarNome() {
    const input = document.querySelector(`.inputentrada`).value;
    if(input !== "") {
        newinput = input;
    } else {
        alert (`Espaco em branco invalido, digite um nome.`)
        location.reload();
    }
}

function buscarNomeAPI() {
    const promisse = axios.get(`https://mock-api.driven.com.br/api/v6/uol/messages`);
    promisse.then(listarNomes);
}

function listarNomes(index) {
    lista = index.data;
    iterarLista(lista);
}

function iterarLista(lista) {
    const main = document.querySelector(`.main`);
    main.innerHTML = "";
    fim = "";
    for (let i = 0; i < lista.length; i++) {
        if (i === (lista.length - 1)) {
            fim = "fim";
        }
        
    }
}

function enviarNomeAPI() {
    const enviardados = {
        name: `${newinput}`
    }
    const promisse = axios.post(`https://mock-api.driven.com.br/api/v6/uol/participants`, enviardados);

    promisse.then(entrar);
    promisse.catch(nomerepetido);
}

function entrar(index) {
    console.log(index);
}

// function nomerepetido(index) {
//     console.log(index.response.status);
//     if (index.response.status === 400) {
//         newinput = prompt(`Escolha um nome diferente, este ja esta em uso.`);
//         newinput;
//         enviarNomeAPI();
//     }
// }

function verificacaoAPI() {
    newinput;
    const enviardados = {
        name: `${newinput}`
    }
    const promisse = axios.post(`https://mock-api.driven.com.br/api/v6/uol/status`, enviardados);

}

setInterval(verificacaoAPI,5000);