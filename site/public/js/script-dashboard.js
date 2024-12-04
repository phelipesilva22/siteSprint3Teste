setInterval(() => {
    var mediaDia = document.getElementById('mediaDia')
    var cabine1 = document.getElementsById('cabine1')

    if (mediaDia.innerHTML != "") {
        cabine1.style.backgroundColor = '#092f94'
    } else {
        cabine1.style.backgroundColor = '#3c404e'
    }
}, 1000);


function mostrarEsconderMenu() {
    var menu = document.getElementById('menu')
    if (menu.classList.contains('visivel')){
        menu.classList.remove('visivel')
        menu.classList.add('invisivel')
    } else {
        menu.classList.remove('invisivel')
        menu.classList.add('visivel')
    }
}

function dashboard() {
    var dashboard = document.getElementById('dashboard')
    var cadastrarFabricas = document.getElementById('cadastrar-fabricas')
    mostrarEsconderMenu()

    cadastrarFabricas.style.display = 'none'
    dashboard.style.display = 'flex'
}

function cadastrarFabricas() {
    var dashboard = document.getElementById('dashboard')
    var cadastrarFabricas = document.getElementById('cadastrar-fabricas')
    mostrarEsconderMenu()

    dashboard.style.display = 'none'
    cadastrarFabricas.style.display = 'flex'
}

function sairCabine() {
    var informacaoIndividual = document.getElementById('informacao-individual')
    var informacaoGeral = document.getElementById('informacao-geral')

    informacaoGeral.style.display = 'flex'
    informacaoIndividual.style.display = 'none'
}
