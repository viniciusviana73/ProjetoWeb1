const sectionLogin = document.querySelector("section#login")
const sectionCadastro = document.querySelector("section#cadastro")

const form = document.querySelector("#formLogin"),
campoEmail = form.querySelector(".email"),
dadosEmail = campoEmail.querySelector("input"),
campoSenha = form.querySelector(".senha"),
dadosSenha = campoSenha.querySelector("input");

const formCad = document.querySelector("#iCadastros"),
campoEmailCad = formCad.querySelector(".email"),
dadosEmailCad = campoEmailCad.querySelector("input"),
campoSenhaCad = formCad.querySelector(".senha"),
dadosSenhaCad = campoSenhaCad.querySelector("input");

let btnLogin = document.querySelector('#btnLogin')
let btnLogado = document.querySelector('#btnLogado')
let areaCadastro = document.querySelector('#cadastro')
let btnDeslogar = document.querySelector('#btnDeslogar')
//let painelEncrypt = document.querySelector('#painelEncrypt')

form.onsubmit = (e)=>{
  
    if(dadosEmail.value == ""){
      campoEmail.classList.add("shake", "erros");
      e.preventDefault();
    }else{
      checarEmail();
    }
    if(dadosSenha.value == ""){
      campoSenha.classList.add("shake", "erros");
      e.preventDefault();
    }else{
      campoSenha.classList.remove("erros");
    }

    setTimeout(()=>{
      campoEmail.classList.remove("shake");
      campoSenha.classList.remove("shake");
    }, 500);

    dadosEmail.onkeyup = ()=>{
      checarEmail();
    }

    function checarEmail(){
      let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if(!dadosEmail.value.match(pattern)){
        campoEmail.classList.add("erros");
        let erromsg = campoEmail.querySelector(".erro-msg");
        (dadosEmail.value != "") ? erromsg.innerText = "O email tem que ser valido" : erromsg.innerText = "O email não pode estar em branco";
        e.preventDefault();
      }else{
        campoEmail.classList.remove("erros");
      }
    }
}

formCad.onsubmit = (e)=>{
  
    if(dadosEmailCad.value == ""){
      campoEmailCad.classList.add("shake", "erros");
      e.preventDefault();
    }else{
      checarEmailCad();
    }
    if(dadosSenhaCad.value == ""){
      campoSenhaCad.classList.add("shake", "erros");
      e.preventDefault();
    }else{
      campoSenhaCad.classList.remove("erros");
    }

    setTimeout(()=>{
      campoEmailCad.classList.remove("shake");
      campoSenhaCad.classList.remove("shake");
    }, 500);

    dadosEmailCad.onkeyup = ()=>{
      checarEmailCad();
    }

    function checarEmailCad(){
      let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if(!dadosEmailCad.value.match(pattern)){
        campoEmailCad.classList.add("erros");
        let erromsgcad = campoEmailCad.querySelector(".erro-msg");
        (dadosEmailCad.value != "") ? erromsgcad.innerText = "O email tem que ser valido" : erromsgcad.innerText = "O email não pode estar em branco";
        e.preventDefault();
      }else{
        campoEmailCad.classList.remove("erros");
      }
    }
}

function irCadastro(){
  hideLogin();
  showCadastro()
}

function hideLogin(){
  sectionLogin.classList.remove('open')
}

function showLogin(){
  sectionLogin.classList.add('open')
}

function showCadastro(){
  sectionCadastro.classList.add('open')
}

function hideCadastro(){
  sectionCadastro.classList.remove('open')
}