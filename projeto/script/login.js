const sectionLogin = document.querySelector("section#login")
const form = document.querySelector("form"),
campoEmail = form.querySelector(".email"),
dadosEmail = campoEmail.querySelector("input"),
campoSenha = form.querySelector(".senha"),
dadosSenha = campoSenha.querySelector("input");

form.onsubmit = (e)=>{
  e.preventDefault();
  
    if(dadosEmail.value == ""){
      campoEmail.classList.add("shake", "erros");
    }else{
      checarEmail();
    }
    if(dadosSenha.value == ""){
      campoSenha.classList.add("shake", "erros");
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
      }else{
        campoEmail.classList.remove("erros");
      }
    }

    if(!campoEmail.classList.contains("erros") && !campoSenha.classList.contains("erros")){
      window.location.href = "index.html";
      console.log("Sucesso")
    }
}

function hideLogin(){
  sectionLogin.classList.remove('open')
}

function showLogin(){
  sectionLogin.classList.add('open')
}