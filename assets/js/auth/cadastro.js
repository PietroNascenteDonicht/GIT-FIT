let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
const form = document.querySelector('form')

form.addEventListener('submit', (ev) => {
    ev.preventDefault()

    if(form.senha.value !== form.confirmarSenha.value){
        //colocar um toast que apoarece falando que as senhas nao batem
    }

    const usuario = {
        nome: form.nome.value,
        email: form.email.value,
        senha: form.senha.value,
    }

    usuarios.push(usuario)

    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    window.location.href = '/views/dashboard/index.html';
})