
function mostrarMenu() {
  const menu = document.getElementById('menuLogin');
  menu.classList.toggle('mostrar');
}

function validarInputs(email,senha) {

   if(!emailValido(email)){
      return alert("Email inválido. Email deve conter '@' e '.' após o @")
   }
   if(!senhaValida(senha)){
    return alert("Senha inválida. Senha deve conter pelo menos um caractere especial\numa letra maiuscula e um numero\nE ter pelo menos 8 digitos")
   }
   return true
}

function emailValido(email){

var validar = (email != "" && email.indexOf("@") != -1)

      if (validar){
        for (var posicao = email.indexOf("@"); posicao < email.length; posicao++){
          if(email[posicao] == "."){
            return true
          }
        }
        return false
      }
      return false
}

function senhaValida(senha){

  var caracteresLista = ["!","@","#","$","%","&","*","(",")","?","<",">"]
  var validar = (senha != "" && (senha.length >=8 && senha.length <=32))
  var temcaractere = false
  var temNumero = false
  if(validar){
    for(var posicao = 0;posicao<senha.length;posicao++){
      if(senha.includes(caracteresLista[posicao])){
          temcaractere = true
          break
      }
    }
    
    for (var posicao = 0;posicao<senha.length;posicao++){
      if(senha[posicao] != isNaN(senha[posicao])){
        temNumero = true
        break
      }
    }
    for (var posicao = 0;posicao<senha.length;posicao++){
      if(senha[posicao] == senha[posicao].toUpperCase()){
        temMaiuscula = true
        break
      }
    }
    if (temNumero && temcaractere && temMaiuscula){
      return true
    }
    return false
  }return false
    
}

const slider = document.querySelector('.slider');
const navegadores = document.querySelectorAll('.navegador');
let posicaoAtual = 0;
const intervalo = 7000; // 7 segundos

function atualizarCarrosel(posicao) {
  slider.style.transform = `translateX(-${posicao * 100}%)`;
  navegadores.forEach((navegador, i) => {
    navegador.classList.toggle('active', i === posicao);
  });
}

function proximoSlide() {
  posicaoAtual = (posicaoAtual + 1) % navegadores.length;
  atualizarCarrosel(posicaoAtual);
}

// Adiciona evento de clique nos indicadores
navegadores.forEach((navegador, posicao) => {
  navegador.addEventListener('click', () => {
    posicaoAtual = posicao; // Usa o índice do indicador diretamente
    atualizarCarrosel(posicaoAtual);
  });
});

// Inicia o carrossel automático
setInterval(proximoSlide, intervalo);

// Configuração inicial
atualizarCarrosel(posicaoAtual);
