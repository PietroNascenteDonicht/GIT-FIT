window.addEventListener('templatePronto', () => {
    let body = document.querySelector('body')
    body = body.dataset.page
    const linksHeader = document.querySelectorAll('.site-header nav ul li a')

    linksHeader.forEach(link => {
        if(link.dataset.link === body){ 
            link.classList.add('ativo')
            return
        }
    })
})