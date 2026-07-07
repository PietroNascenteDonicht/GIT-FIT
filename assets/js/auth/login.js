import { callModal } from "/assets/js/modal.js"
import { getUsuarios } from "/assets/js/usuarioLocalstorage.js"

const usuarios = getUsuarios()

const form = document.getElementById('login')

form.addEventListener('submit', (ev) => {
    ev.preventDefault()
    
    const email = form.email.value
    const senha = form.senha.value

    if(email === 'admin@gmail.com' && senha === 'funciona'){
        return window.location.href = '/views/admin/index.html'
    }

    if(usuarios.length === 0){
        return callModal('erro', 'usuario nao encontrado')
    }

    for (const usuario of usuarios) {
        if(usuario.email === email){
            if(usuario.senha === senha){
                localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
                window.location.href = '/views/dashboard/index.html';
            }else{
                //senha errada
                callModal('erro', 'Senha errada')
            }
        } else {
            callModal('erro', 'usuario nao encontrado')
        }
    };
})