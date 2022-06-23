let clique, cliqueDois, cliqueTres;

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
    setTimeout(tresTempos,3000)
}

function tresTempos() {
    cliqueTres = document.querySelector(`.principal`)
    if (cliqueDois !== undefined) {
        cliqueDois.classList.add(`escondido`);
        cliqueTres.classList.remove(`escondido`);
    }
}