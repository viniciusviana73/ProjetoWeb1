let textAreaEncrypt = document.querySelector('#txtEncrypt')
let inputKeyC       = document.querySelector('#inputKeyC')
let divEncrypt      = document.querySelector('#divCripto')
let menuEncrypt     = document.querySelector('#targetEncrypt')
let textAreaDecrypt = document.querySelector('#txtDecrypt')
let inputKeyU       = document.querySelector('#inputKeyU')
let divDecrypt      = document.querySelector('#divUncripto')
let resultado       = document.querySelector('#resultado')

async function encryptData() {
    if (checkInput(textAreaEncrypt, inputKeyC)){
        try {
            const url      = 'https://classify.yurace.pro/api/encrypt';
            const jsonData = JSON.stringify({ 
                data: String(textAreaEncrypt.value), 
                key:  String(inputKeyC.value)
            });
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: jsonData
            });
            const result = await response.json();
            textAreaEncrypt.value = `${result.result}`
        } catch (error) {
            alert(`Erro: ${error}`);
        }
    }
}

async function decryptData(){
    if (checkInput(textAreaDecrypt, inputKeyU)){
        try {
            const url      = 'https://classify.yurace.pro/api/decrypt';
            const jsonData = JSON.stringify({ 
                data: String(textAreaDecrypt.value), 
                key:  String(inputKeyU.value)
            });
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: jsonData
            });
            const result = await response.json();
            resultado.style.background = '#0000008c'
            resultado.innerHTML = ` <p>Resultado texto descriptografado com a chave "${String(inputKeyU.value)}": ${JSON.stringify(result.result)}</p>`
        } catch (error) {
            alert(`Erro: ${error}`);
        }
    }
}

function checkInput(textArea, inputKey){
    if (textArea.value == "" || inputKey.value == ""){
        resultado.style.color      = 'red'
        resultado.style.background = '#0000008c'
        resultado.innerHTML = `<p>Erro: Preencha todos os campos corretamente!</p>`
        return false
    } else {
        resultado.style.background = 'transparent'
        resultado.style.color = 'white'
        resultado.innerHTML   = ''
        return true
    }
}

function genKey(){
    try {
        var xhr = new XMLHttpRequest();
        xhr.open ("GET", `https://classify.yurace.pro/api/keygen`, true);
        xhr.setRequestHeader ("Accept", "application/json");
        xhr.onreadystatechange = function(){
        if((xhr.readyState == 0 || xhr.readyState == 4) && xhr.status == 200)
            console.log(xhr.responseText)
            const keyJ = JSON.parse(xhr.responseText)
            inputKeyC.value = keyJ.key
        };
        xhr.send (null);
    } catch (error) {
        alert(`Erro: ${error}`)
    }
}


const inputTermo = document.querySelector("#inputTermo"),
      artigo = document.querySelector("article.artigos"),
      sResult = document.querySelector("section.searchResult")


inputTermo.onkeyup = async (event) => {
    if (inputTermo.value.length > 2) {
        try {
            const url = '/NoticiasJSON'
            const jsonData = JSON.stringify({ termo: inputTermo.value })
            let response = await fetch(url, {
                                        method: 'POST',
                                        headers: {'Content-Type': 'application/json;charset=utf-8'},
                                        body: jsonData
                                        })
            //console.log(response)
            console.log(jsonData)
            const result = await response.json()
            console.log(result)
            sResult.innerHTML = ''
            if (result.length < 1) {
                sResult.innerHTML = '<p class="pResults">Nenhum resultado encontrado.</p>'
                return
            }
            result.forEach((noticias, index) => {
                if (index > 0) {
                    sResult.innerHTML += '<hr>'
                }
                sResult.innerHTML += `<p class="pResults"><a class="aResults" href="#${noticias._id}">${noticias.title}</a></p>`
            })
            return
        } catch (error) {
            console.log(error)
        }
    } else {
        sResult.innerHTML = ''
    }    
}