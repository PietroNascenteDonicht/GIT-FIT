function callModal(type = 'info', text = 'TESTE', blur = false){
    body = document.querySelector('body')

    if(blur){
        const modalBlur = document.createElement('div')
        modalBlur.classList.add('modal-backdrop')

        body.appendChild(modalBlur)
    }

    const modal = document.createElement('div')
    modal.classList.add('modal')

    const titulo = document.createElement('h1')
    const mensagem = document.createElement('p')
    mensagem.textContent = text

    modal.appendChild(titulo)
    modal.appendChild(mensagem)

    titulo.textContent = type.charAt(0).toUpperCase() + type.slice(1);
    switch (type) {
        case 'erro':
            modal.classList.add('erro')
            break;

        case 'sucess':
            modal.classList.add('sucesso')
            break;

        default:
            break;
    }

    body.appendChild(modal)
}