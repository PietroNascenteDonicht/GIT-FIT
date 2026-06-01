window.addEventListener('templatePronto', () => {
    const btns = document.querySelectorAll(".btn-carrosel button")

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('ativo'))
            btn.classList.add('ativo')
        })
    })
})