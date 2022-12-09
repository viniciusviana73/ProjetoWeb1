const formNoticias = document.querySelector('.form-noticias');

formNoticias.addEventListener('submit', function postar(e){
    e.preventDefault();

    const campoTitulo = document.querySelector('#ititulo');
    const campoConteudo = document.querySelector('#iconteudo');
    const campoPostagens = document.querySelector('#postagens');

    campoPostagens.insertAdjacentHTML('afterbegin', 
    `<li id="cTitulo">Titulo: ${campoTitulo.value}</li>
    <li id="cConteudo">${campoConteudo.value}</li><br>`);

    campoTitulo.value = '';
    campoConteudo.value = '';

})