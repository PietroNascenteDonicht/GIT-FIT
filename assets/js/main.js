async function executeAll(){
    let body = document.querySelector('body')
    let html = body.innerHTML

    const matches = html.match(/{{.*?}}/gm)

    matches.forEach(async (match) => {
        let code = match.split(/\{\{|\}\}/)
        code = code.slice(1, code.length-1)

        //testa se o codigo chamado tem parametros
        //se tiver chama o switch das funcoes com parametros
        
        if(/\w+\(.*\)/.test(code[0])){
            code = code[0].split(/\(|\)/)
        }
        switch (code[0]) {
            case 'render':
                code.pop
                const rendered = await render(code[1])
                html = html.replace(match, rendered)
                body.innerHTML = html

                break;

            case 'loadAssets':
                    code = code[1].split(', ')
                    loadAssets(code[0], code[1])
                break;
        
            default:
                break;
        }
        if(end){return end}
    })
}

executeAll()


function render(url){
    return(fetch('/views/' + url))
    .then(Response => {return Response.text()})
}

function loadAssets(type = 'css', name, defer = false){
    if(type === 'css'){
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = '/assets/css/' + name
    }else{
        const script = document.createElement('script')
        script.src = '/assets/css/' + name
        script.defer = defer
    }
}