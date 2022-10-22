let textAreaEncrypt = document.querySelector('#txtEncrypt')
let inputKeyC       = document.querySelector('#inputKeyC')
let divEncrypt      = document.querySelector('#divCripto')
let menuEncrypt     = document.querySelector('#targetEncrypt')
let textAreaDecrypt = document.querySelector('#txtDecrypt')
let inputKeyU       = document.querySelector('#inputKeyU')
let divDecrypt      = document.querySelector('#divUncripto')
let resultado       = document.querySelector('#resultado')

menuEncrypt.click()

async function encryptData() {
    if (checkInput(textAreaEncrypt, inputKeyC)){
        try {
            const url      = 'https://classify-web.herokuapp.com/api/encrypt';
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
            const url      = 'https://classify-web.herokuapp.com/api/decrypt';
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
            resultado.innerHTML = ` <p>Resultado texto descriptografado com a chave "${String(inputKeyU.value)}": ${JSON.stringify(result.result)}</p>`
        } catch (error) {
            alert(`Erro: ${error}`);
        }
    }
}

function checkInput(textArea, inputKey){
    if (textArea.value == "" || inputKey.value == ""){
        resultado.innerHTML   = `<p>Erro: Preencha todos os campos corretamente!</p>`
        resultado.style.color = 'red'
        return false
    } else {
        resultado.style.color = 'white'
        return true
    }
}