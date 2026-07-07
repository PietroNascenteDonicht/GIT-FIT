import { atualizarUsuario, getUsuarioLogado, getUsuarios } from "/assets/js/usuarioLocalstorage.js";
import { callModal } from "/assets/js/modal.js";

window.addEventListener('templatePronto', () => {

    const usuarios = getUsuarios()
    console.log(usuarios)
    const usuarioLogado = getUsuarioLogado();
    console.log(usuarioLogado)
    const planos = JSON.parse(localStorage.getItem('planos')) || [
        {name: 'basico',preco: 89},
        {name: 'pro',preco: 149},
        {name: 'elite',preco: 249}
    ]

    document.querySelectorAll('.planos .btn').forEach(p => {
        p.addEventListener('click', () => {
            if (!usuarioLogado) {
                callModal('erro', 'Você precisa estar logado para assinar um plano.', true);
                return;
            }

            if (usuarioLogado.plano) {
                callModal('info', `Você já possui o plano ${usuarioLogado.plano}.`, true);
                return;
            }

            usuarioLogado.plano = p.id;
            atualizarUsuario(usuarios, usuarioLogado)
            callModal('sucess', `Plano ${p.id} selecionado com sucesso!`, true);
        })
    })

    localStorage.setItem('planos', JSON.stringify(planos));
})

