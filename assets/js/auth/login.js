let usuarios = JSON.parse(localStorage.getItem('usuarios'))

console.log(usuarios)

const form = document.getElementById('login')

form.addEventListener('submit', (ev) => {
    ev.preventDefault()
    
    const email = form.email.value
    const senha = form.senha.value

    for (const usuario of usuarios) {
        if(usuario.email === email){
            if(usuario.senha === senha){
                localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
                console.log(usuario)
                window.location.href = '/views/dashboard/index.html';
            }else{
                //senha errada
                console.log('senha errada')
            }
        } else {
            console.log('usuario nao encontrado')
        }
    };
})