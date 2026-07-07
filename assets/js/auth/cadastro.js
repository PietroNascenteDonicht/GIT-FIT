import { callModal } from "../modal.js";

let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
const form = document.querySelector('form')

form.addEventListener('submit', (ev) => {
    ev.preventDefault()
    if(form.senha.value !== form.confirmarSenha.value){
        //colocar um toast que apoarece falando que as senhas nao batem
        callModal('erro', 'Senhas nao sao iguais')
        return;
    }

     

    const email = form.email.value

    for (const usuario of usuarios) {
        if(usuario.email === email){
            callModal('erro', 'usuario ja existente')
            return;
        }
    };

    const usuario = {
        nome: form.nome.value,
        email: form.email.value,
        senha: form.senha.value,
        plano: '',
    }

    usuarios.push(usuario)

    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    window.location.href = '/views/dashboard/index.html';
})