    window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) { // Mude 50 para o valor que preferir
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

function mostrarMenu() {
    var login = document.getElementsByClassName('login')[0]
    if(login.style.display == 'none'){
       login.style.display = 'flex'
       login.style.transform = 'translate(0%)'
    } else{
      login.style.display = 'none'
    }
  }