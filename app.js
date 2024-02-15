let listaDeNumerosSorteados = []; // Lista vazia 
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio(); // Armazena o retorno da função
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2}); // script que permite um voice dentro do jogo
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial(); 

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentivas' : 'tentativa';
        let mensagemTentativa = `Você descobriu o número secreto, com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');

    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}
// a função "gerarNumeroAleatorio()", gera um número aleatório e verifica se ele já foi utilizado. Caso seja, ele irá gerar um novo número
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadedeElementosNaLista = listaDeNumerosSorteados.length;
    
// limpa a listaDeNumerosSorteados quando todos os números forem utilizados, evitando assim, um error.
    if (quantidadedeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();

    } else {
        listaDeNumerosSorteados.push(numeroEscolhido); // a função "push", adiciona a variavel a lista na ultima posição
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}