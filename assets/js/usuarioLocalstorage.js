export function getUsuarios(){
    return JSON.parse(localStorage.getItem('usuarios')) || []
}

export function getUsuarioLogado(){
    return JSON.parse(localStorage.getItem('usuarioLogado')) || []
}

export function atualizarUsuario(usuarios, usuarioLogado){
    const index = usuarios.findIndex(u => u.email === usuarioLogado.email);
    // ou use id, CPF, username... qualquer campo único

    if (index !== -1) {
        usuarios[index] = usuarioLogado;
    }

    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
}