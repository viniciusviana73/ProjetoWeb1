const sectionCadastro = document.querySelector("section#cadastro"),
      formCad = document.querySelector("#iCadastros"),
      campoEmailCad = formCad.querySelector(".email"),
      dadosEmailCad = campoEmailCad.querySelector("input"),
      campoUsernameCad = formCad.querySelector("campos nome"),
      dadosUsernameCad = document.querySelector("#iusername")
      campoSenhaCad = formCad.querySelector(".senha"),
      dadosSenhaCad = campoSenhaCad.querySelector("input"),
      blockerCad = formCad.querySelector("blocker")
let areaCadastro = document.querySelector('#cadastro')

formCad.onsubmit = (e) => {

    if (dadosEmailCad.value == "") {
        campoEmailCad.classList.add("shake", "erros");
        e.preventDefault();
    } else {
        checarEmailCad();
    }
    if (dadosSenhaCad.value == "") {
        campoSenhaCad.classList.add("shake", "erros");
        e.preventDefault();
    } else {
        campoSenhaCad.classList.remove("erros");
    }

    setTimeout(() => {
        campoEmailCad.classList.remove("shake");
        campoSenhaCad.classList.remove("shake");
    }, 500);

    dadosEmailCad.onkeyup = () => {
        checarEmailCad();
    }

    function checarEmailCad() {
        let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!dadosEmailCad.value.match(pattern)) {
            campoEmailCad.classList.add("erros");
            let erromsgcad = campoEmailCad.querySelector(".erro-msg");
            (dadosEmailCad.value != "") ? erromsgcad.innerText = "O email tem que ser valido" : erromsgcad.innerText = "O email não pode estar em branco";
            e.preventDefault();
        } else {
            campoEmailCad.classList.remove("erros");
        }
    }
}
function showCadastroAdmin() {
    sectionCadastro.classList.add('open')
    blockerCad.classList.add('admCadBlocker')
}

function hideCadastro() {
    sectionCadastro.classList.remove('open')
}