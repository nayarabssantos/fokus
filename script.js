const html = document.querySelector('html');

const btnFoco = document.querySelector('.app__card-button--foco');
const btnCurto = document.querySelector('.app__card-button--curto');
const btnLongo = document.querySelector('.app__card-button--longo');
const btnComecarPausar = document.getElementById('start-pause');
const btnTodos = document.querySelectorAll('.app__card-button');

const displayTempo = document.getElementById('timer');

const musicaFocoInput = document.getElementById('alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const audioPausar = new Audio('/sons/pause.mp3');
const audioComecar = new Audio('/sons/play.wav');
const audioTempoFinalizado = new Audio('/sons/beep.mp3');
const descComecarPausar = document.querySelector('span');

let tempoDecorridoEmSegundos = 5 //1500;
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

btnFoco.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco')
    btnFoco.classList.add('active')
});

btnCurto.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto')
    btnCurto.classList.add('active')
})

btnLongo.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo')
    btnLongo.classList.add('active')
})

function alterarContexto(contexto){
    mostrarTempo();
    btnTodos.forEach(function(contexto){
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

        const focoAtivo = html.getAttribute('data-contexto') == 'foco';

        if(focoAtivo){
            const evento = new CustomEvent('FocoFinalizado');
            document.dispatchEvent(evento)
        }

        zerar();
        imgPlayPause.setAttribute('src', '/imagens/play_arrow.png')
        descComecarPausar.innerText = 'Começar';
        audioTempoFinalizado.pause();
        return ;
    }

    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

btnComecarPausar.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar(){
    if(intervaloId){
        imgPlayPause.setAttribute('src', '/imagens/play_arrow.png')
        descComecarPausar.innerText = 'Começar';
        audioPausar.play();
        zerar();
        return;
    }

    imgPlayPause.setAttribute('src', '/imagens/pause.png')
    descComecarPausar.innerText = 'Pausar';
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