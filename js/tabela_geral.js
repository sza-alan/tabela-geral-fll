let fii_user = [];
let fii_table = [];

async function carregarDadosUser(url){
    await fetch(url)
            .then(resp => resp.json())
            .then(json => fii_user = json);
    carregarDadosFundos();
}

async function carregarDadosFundos(){
    
    for (let fii of fii_user){
        let json = await fetch(`https://api-simple-flask.herokuapp.com/api/${fii.nome}`)
                        .then(resp => resp.json());
        fii_table.push(json);  
    }
     
    exibirTabela();
}

carregarDadosUser("json/fii.json");

function exibirTabela(){ 

    for(i = 0; i < 14; i++ ){

        var fundo = fii_user[i].nome.toUpperCase();
        var setor = fii_table[i].setor;
        var data_base = fii_table[i].ultimoRendimento.dataBase;
        var data_pagamento = fii_table[i].ultimoRendimento.dataPag;
        var provento = fii_table[i].ultimoRendimento.rendimento;
        var cotaAtual = fii_table[i].valorAtual;
        var qtde = fii_user[i].qtde;
        var total_investimento = fii_user[i].totalgasto;
        var precoMedio = total_investimento / qtde;
        var rendimento = provento * 100 / cotaAtual;
        var dy = fii_table[i].dividendYield;
        var rendimentoMedio = provento * 100 / cotaAtual;

        var bg;
        if (rendimentoMedio < 0.6){
            bg = 'bgRed';
        }else{
            bg = 'bgBlue';
        }

        document.querySelector("table").innerHTML += `  
            <td class=${bg} id='td'>${fundo}</td>
            <td class=${bg}>   ${setor}</td> 
            <td class=${bg}>   ${data_base}</td>
            <td class=${bg}>   ${data_pagamento}</td>
            <td class=${bg}>R$ ${provento}</td>
            <td class=${bg}>R$ ${cotaAtual}</td>
            <td class=${bg}>   ${qtde}</td>
            <td class=${bg}>R$ ${total_investimento}</td>
            <td class=${bg}>R$ ${precoMedio.toFixed(2)}</td>
            <td class=${bg}>R$ ${rendimento.toFixed(2)}%</td>
            <td class=${bg}>   ${dy}%</td>
            <td class=${bg}>R$ ${rendimentoMedio.toFixed(2)}</td>
        `
    
        if (i==13){
            let total_gasto = 0;
            let total_provento = 0;
            let total_cotas = cotaAtual * (cotaAtual+i);
            
            document.querySelector("table").innerHTML += ` 
                <tr class='fundo_total'>
                <td colspan = '4'> Total Geral</td>
                <td>R$ ${total_provento}</td>
                <td>-</td>
                <td>${total_cotas}</td>
                <td>R$ ${total_gasto.toFixed(2)}</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                </tr>
            `;
        }      
    }
    
    /* Implemente aqui os cálculos solicitados no PDF,
    os cálculos devem ter como base, uma repetição no vetor fii_user
    e para cada fundo, consulte suas demais informações no vetor fii_table

    DICA para procurar um fundo do vetor fii_user no vetor fii_table
    let dados_fii = fii_table.find( (item) => item.fundo.indexOf(fii.nome.toUpperCase()) >= 0);

    Dentro da repetição, após os cálculos, monte a linha na tabela com o comando

    document.querySelector("table").innerHTML += variável

    Note que o cabeçalho da tabela já está pronto no HTML.
    Fora do for, adicione na tabela a linha final de total conforme exemplo no PDF.
    */ 
}