const html = document.querySelector('html');

const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const startPauseBt = document.getElementById('start-pause');
const botoes = document.querySelectorAll('.app__card-button');

const displayTempo = document.getElementById('timer');

const musicaFocoInput = document.getElementById('alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const audioPausar = new Audio('/sons/pause.mp3');
const audioComecar = new Audio('/sons/play.wav');
const audioTempoFinalizado = new Audio('/sons/beep.mp3');
const startPauseDesc = document.querySelector('span');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musica.loop = true;


const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const imgPlayPause = document.querySelector('.app__card-primary-butto-icon');

const duracaoFoco = 1500;
const duracaoCurto = 300;
const duracaoLongo = 900;

musicaFocoInput.addEventListener('change', () =>{
    if (musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
});

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco')
    focoBt.classList.add('active')
});

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto){
    mostrarTempo();
    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)  
   switch (contexto) {
    case "foco":
        titulo.innerHTML = `Otimize sua produtividade,
        <strong class="app__title-strong">mergulhe no que importa.</strong>`
        break;

    case "descanso-curto":
        titulo.innerHTML = `Que tal dar uma respirada?
        <strong class="app__title-strong">Faça uma pausa curta!</strong>`
        break;
   
    case "descanso-longo":
        titulo.innerHTML = `Que tal dar uma respirada?
        <strong class="app__title-strong">Faça uma pausa longa.</strong>`
        break;

    default:
        break;
   }

}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <=0){
        audioTempoFinalizado.play();
        alert('Tempo finalizado!');
        zerar();
        imgPlayPause.setAttribute('src', '/imagens/play_arrow.png')
        startPauseDesc.innerText = 'Começar';
        audioTempoFinalizado.pause();
        return ;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar(){
    if(intervaloId){
        imgPlayPause.setAttribute('src', '/imagens/play_arrow.png')
        startPauseDesc.innerText = 'Começar';
        audioPausar.play();
        zerar();
        return
    }

    imgPlayPause.setAttribute('src', '/imagens/pause.png')
    startPauseDesc.innerText = 'Pausar';
    audioComecar.play();
    intervaloId = setInterval(contagemRegressiva, 1000)
}

function zerar(){
    clearInterval(intervaloId);
    intervaloId = null;
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    displayTempo.innerHTML = `${tempoFormatado}`
}

mostrarTempo();