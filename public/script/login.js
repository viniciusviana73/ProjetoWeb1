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

const formNoticia = document.querySelector(".form-noticias"),
campoTituloNot = formNoticia.querySelector("#n-1"),
dadosTituloNot = campoTituloNot.querySelector("input"),
campoConteudoNot = formNoticia.querySelector("#n-2"),
dadosConteudoNot = campoConteudoNot.querySelector("textarea");

let btnLogin = document.querySelector('#btnLogin')
let btnLogado = document.querySelector('#btnLogado')
let areaCadastro = document.querySelector('#cadastro')
let btnDeslogar = document.querySelector('#btnDeslogar')
let painelEncrypt = document.querySelector('#painelEncrypt')
let msgInicial = document.querySelector('#msgInicial')

msgInicial.style.fontSize = '30px'
msgInicial.style.margin = '150px auto'
msgInicial.style.padding = '15px'
msgInicial.style.background = 'rgba(0, 0, 0, 0.600)'
msgInicial.style.fontFamily = 'BrownBold'
msgInicial.innerHTML = `<p>AVISO: Faça login para ter acesso ao sistema de criptografia.</p>`

onLoad()

function onLoad(){
  if (localStorage.getItem("logado") == 'false'){
    painelEncrypt.style.display = 'none'

  } else if (localStorage.getItem("logado") == 'true'){
    painelEncrypt.style.display = 'block'
    btnLogin.style.display = 'none'
    btnLogado.style.display = 'block'
    btnDeslogar.style.display = 'block'
    msgInicial.style.display = 'none'   
  }
}

function deslogar(){
  localStorage.setItem("logado","false");
  window.location.reload(true);
}


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

formNoticia.onsubmit = (e)=>{
  
  if(dadosTituloNot.value == ""){
    campoTituloNot.classList.add("shake", "erros");
    e.preventDefault();
  }else{
    campoTituloNot.classList.remove("erros");
  }

  if(dadosConteudoNot.value == ""){
    campoConteudoNot.classList.add("shake", "erros");
    e.preventDefault();
  }else{
    campoConteudoNot.classList.remove("erros");
  }

  setTimeout(()=>{
    campoTituloNot.classList.remove("shake");
    campoConteudoNot.classList.remove("shake");
  }, 500);

}


/*async function logar(){
  let emailForm = document.querySelector('#iemail').value
  let senhaForm = document.querySelector('#ipassword').value
  //let pass  = document.querySelector('#isenha').value
  
  try {
      let url      = 'https://reqres.in/api/login';
      let jsonData = JSON.stringify({
        "email": String(emailForm),
        "password": String(senhaForm)  // Conferir check da senha
      })
      let response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: jsonData
      })
      const result = await response.text();
      const final = JSON.parse(result)
      if (final.token == undefined){
        hideLogin()
        btnLogin.style.display = 'none'
        alert(`Logado! Token: ${final.token}`) 
      }
  } catch (error) {
      alert(`Erro: ${error}`);
  }
}*/

/** 
const formCadastros = document.querySelector('#iCadastros');

formCadastros.addEventListener('submit', function postar(e){
    e.preventDefault();
*/
function irCadastro(){
  hideLogin();
  areaCadastro.style.display = 'flex'
}

function hideLogin(){
  sectionLogin.classList.remove('open')
}

function showLogin(){
  sectionLogin.classList.add('open')
}

/*
form.addEventListener("submit", function(e){
  let emailForm = document.querySelector('#iemail').value
  let senhaForm = document.querySelector('#ipassword').value
  let resLogin  = document.querySelector('#resLogin')

  e.preventDefault();

  fetch("https://reqres.in/api/login", {
      method: 'POST',
      headers : {"Content-Type": "application/json"},
      body: JSON.stringify({
          "password": senhaForm,
          "email": emailForm
      })
  })

  .then(response => {
   if (response.status != 400) {
    btnLogin.style.display = 'none'
    btnLogado.style.display = 'block'
    resLogin.style.color = '#71e067'
    resLogin.innerHTML = `Logado com sucesso!`
    localStorage.setItem("logado","true")
      setTimeout(function(){
        hideLogin()
      }, 1500)
    onLoad()   
    } else if (response.status = 400){
      localStorage.setItem("logado","false")
      resLogin.style.color = '#ff0000b3'
      resLogin.innerHTML = `Erro ao logar! Usuário inválido!`
    }
    return response.json();})
  .then(jsonData => {
    console.log(jsonData)})
})
*/