let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = numeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2});  
}

function exibirComeco() {
    exibirTextoNaTela("h1", "Jogo do número");
    exibirTextoNaTela("p", "escolha nenhum");    
}

exibirComeco();
 
function verificarChute(){
    let chute = document.querySelector("input").value;
    
    if (chute ==numeroSecreto) {
        exibirTextoNaTela("h1" , "Acertou");
        let palavraTentativas = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativas}!`;
        exibirTextoNaTela("p ", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        if(chute > numeroSecreto){
            exibirTextoNaTela("p", `Errou! O número secreto é menor que ${chute}`);   
        } else{
            exibirTextoNaTela("p", `O número secreto é maior que ${chute}`);
        }
        tentativas++;
        limparCampo();
    }
}

function numeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElemento = listaDeNumerosSorteados.length;

    if (quantidadeDeElemento == numeroLimite ) {
        listaDeNumerosSorteados =  [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return numeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector("input");
    chute.value = "";    
}

function reiniciarJogo() {
    numeroSecreto = numeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirComeco();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}