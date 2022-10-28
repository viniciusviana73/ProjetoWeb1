const sectionLogin = document.querySelector("section#login")
const form = document.querySelector("form"),
campoEmail = form.querySelector(".email"),
dadosEmail = campoEmail.querySelector("input"),
campoSenha = form.querySelector(".senha"),
dadosSenha = campoSenha.querySelector("input");
let btnLogin = document.querySelector('#btnLogin')

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
      logar()
    }
}

async function logar(){
  let email = document.querySelector('#iemail').value
  //let pass  = document.querySelector('#isenha').value
  
  try {
      let url      = 'https://reqres.in/api/login';
      let jsonData = JSON.stringify({
        "email": String(email),
        "password": "??????"  // Conferir check da senha
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
      if (final.token != undefined){
        hideLogin()
        btnLogin.style.display = 'none'
        alert(`Logado! Token: ${final.token}`) 
      }
  } catch (error) {
      alert(`Erro: ${error}`);
  }
}

function hideLogin(){
  sectionLogin.classList.remove('open')
}

function showLogin(){
  sectionLogin.classList.add('open')
}