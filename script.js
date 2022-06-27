let lista = [];
let clique, cliqueDois, cliqueTres, newinput, fim, enviardados, enviarmsg, logos, sidebares, sidebarblack, people, privacy, enviarmsgdois;
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

function sidebar() {
    logos = document.querySelector(`.logodireita`);
    sidebares = document.querySelector(`.sidebar`);
    if (logos !== undefined) {
        sidebares.classList.remove(`escondido`);
    }
}

function sidebargranted() {
    addEventListener(`click`, () => {
        iterarLista().stopPropagation();
        buscarNomeAPI().preventDefault();
    })
}

function sidebarshow() {
    setTimeout(sidebar,500);
}

function escondernovamente() {
    sidebarblack = document.querySelector(`.sidebar-black`);
    if (sidebarblack !== undefined) {
        sidebares.classList.add(`escondido`)
    }
}

let count = 0;

function check() {
    people = document.querySelector(`.publico`);
    privacy = document.querySelector(`.reservadamente`);
    if (count === 0) {
        people.classList.add(`aparecer`);
        privacy.classList.remove(`aparecer`);
        count++;
    }
}

function check2() {
    if(count !== 0) {
        privacy.classList.add(`aparecer`);
        people.classList.remove(`aparecer`);
        count--;
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
        switch (lista[i].type) {
            case "message":
                main.innerHTML +=
                    `<div class="${lista[i].type} ${fim}"><span class="timer">(${lista[i].time})</span><span><strong>${lista[i].from}</strong></span> <span class="span1">para</span> <span><strong>${lista[i].to}</strong></span> <span>: ${lista[i].text}</span></div>`;
                break
            case "status":
                main.innerHTML +=
                    `<div class="${lista[i].type} ${fim}"><span class="timer">(${lista[i].time})</span><span><strong>${lista[i].from}</strong></span> <span>: ${lista[i].text}</span></div>`;
                break

            case "private_message":
                if(lista[i].to === newinput) {
                    main.innerHTML +=
                    `<div class="${lista[i].type} ${fim}"><span class="timer">(${lista[i].time})</span><span><strong>${lista[i].from}</strong></span> <span class="span2">reservadamente</span>  <span class="span3">para</span> <span><strong>${lista[i].to}</strong></span> <span>: ${lista[i].text}</span></div>`;
                }
                break
        }

    }
    document.querySelector(`.fim`).scrollIntoView();
}



function enviarNomeAPI() {
    enviardados = {
        name: `${newinput}`
    }
    const promisse = axios.post(`https://mock-api.driven.com.br/api/v6/uol/participants`, enviardados);

    promisse.then(entrar);
    promisse.catch(nomerepetido);
}

function entrar(index) {
    console.log(index);
}

function novoNome() {
    newinput = prompt(`Digite um nome valido.`)
}

function nomerepetido(index) {
    console.log(index.response.status);
    if (index.response.status === 400) {
        novoNome();
        enviarNomeAPI();
    }
}

function verificacaoAPI() {
    newinput;
    enviardados = {
        name: `${newinput}`
    }
    const promisse = axios.post(`https://mock-api.driven.com.br/api/v6/uol/status`, enviardados);

}

setInterval(verificacaoAPI,5000);

enviarmsg = document.querySelector(`textarea`);
enviarmsg.addEventListener(`keypress`, (index) => {
    if(index.key === "Enter") {
        index.preventDefault();
        enviarMsgAPI();
    }
})

function cliques() {
    enviarmsgdois = document.querySelector(`.logoenviar`);
    if(enviarmsgdois !== undefined) {
        enviarMsgAPI();
    }

}


function enviarMsgAPI() {
    const promisse = axios.post(`https://mock-api.driven.com.br/api/v6/uol/messages`, {
        from: newinput,
        to: "Todos",
        text: enviarmsg.value,
        type: "message"
    })
    enviarmsg.value= "";
    promisse.then(() => {
        const promisse = axios.get(`https://mock-api.driven.com.br/api/v6/uol/messages`);
        promisse.then(listarNomes)
    })
    promisse.catch(() => {
        window.location.reload();
    })
}