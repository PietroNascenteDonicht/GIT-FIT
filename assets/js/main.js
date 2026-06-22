async function executeAll() {
    let body = document.querySelector('body');
    let html = body.innerHTML;

    const matches = html.match(/{{.*?}}/gm);

    if (!matches){
        const matches = html.match(/@/gm)
        for (const match of matches) {
            let match =  match.replace('@', '')

            varRead(match)
        }
    }

    // const promises = matches.map(async (match, index) => {
    //     return index;
    // });

    // await Promise.all(promises);




    for (const match of matches) {
        // 1. Remove as chaves {{ e }} e limpa espaços nas pontas
        let cleanText = match.replace(/\{\{|\}\}/g, '').trim();

        // 2. Separa o nome da função dos parâmetros usando a abertura de parênteses '('
        let parts = cleanText.split('(');
        let functionName = parts[0].trim();
        
        // 3. Pega o conteúdo de dentro dos parênteses e limpa o parêntese de fechamento ')'
        let rawParams = parts[1] ? parts[1].replace(')', '').trim() : '';

        switch (functionName) {
            case 'render':
                // Remove aspas que possam envolver a URL
                const url = rawParams.replace(/['"]/g, '').trim();
                const rendered = await render(url);
                
                html = html.replace(match, rendered);
                body.innerHTML = html;
                break;

            case 'loadAssets':
                // Divide os parâmetros por vírgula
                let params = rawParams.split(', ');
                
                // Usa const/let para não vazar as variáveis para o escopo global
                // Remove aspas e espaços extras de cada parâmetro
                const tipo = params[0] ? params[0].replace(/['"]/g, '').trim() : 'css';
                const nome = params[1] ? params[1].replace(/['"]/g, '').trim() : '';
                const defer = params[2] ? params[2].replace(/['"]/g, '').trim() : 'true';
                const module = params[3] ? params[3].replace(/['"]/g, '').trim() : 'true';
                
                // O await garante que se for um script JS, o loop espera ele carregar completamente
                await loadAssets(tipo, nome, defer, module);

                // apaga comando
                html = html.replace(match, '');
                body.innerHTML = html;
                break;
        
            default:
                break;  
        }
    }

    const evento = new CustomEvent('templatePronto');
    window.dispatchEvent(evento);
}

executeAll();

function render(url) {
    return fetch('/views/' + url)
        .then(response => response.text());
}

// Transformada em função assíncrona para o loop poder esperar o carregamento de scripts
function loadAssets(type = 'css', name, defer = false, module = true) {
    return new Promise((resolve, reject) => {
        if (type === 'css') {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = '/assets/css/' + name;
            
            // CSS carrega de forma assíncrona sem travar, podemos liberar o resolve imediatamente
            document.head.appendChild(link)
            resolve();
        } else {
            defer = defer === 'true' ? true : false;
            module = module === 'true' ? true : false;

            const script = document.createElement('script');
            script.src = '/assets/js/' + name;
            script.defer = defer;

            if(module === true){script.type = 'module'}
            
            // IMPORTANTE: Só resolve a promessa quando o script terminar de baixar e rodar no navegador
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Falha ao carregar o script: ${name}`));
            
            document.head.appendChild(script);
        }
    });
}

function varRead(data){
    console.log(data)
}
