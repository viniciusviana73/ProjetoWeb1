const formNoticia = document.querySelector(".form-noticias"),
    campoTituloNot = formNoticia.querySelector("#n-1"),
    dadosTituloNot = campoTituloNot.querySelector("input"),
    campoConteudoNot = formNoticia.querySelector("#n-2"),
    dadosConteudoNot = campoConteudoNot.querySelector("textarea")

formNoticia.onsubmit = (e) => {

    if (dadosTituloNot.value == "") {
        campoTituloNot.classList.add("shake", "erros");
        e.preventDefault();
    } else {
        campoTituloNot.classList.remove("erros");
    }

    if (dadosConteudoNot.value == "") {
        campoConteudoNot.classList.add("shake", "erros");
        e.preventDefault();
    } else {
        campoConteudoNot.classList.remove("erros");
    }

    setTimeout(() => {
        campoTituloNot.classList.remove("shake");
        campoConteudoNot.classList.remove("shake");
    }, 500);
}