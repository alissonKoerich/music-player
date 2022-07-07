document.querySelector('.botao-pause').style.display='none'
document.querySelector('.muted').style.display='none'
document.querySelector('.highAudio').style.display='none'

let musicas=[
    {titulo:'Living life in the night',artista:'Cheriimoya,Sierra Kidd',src:'songs/living-life-in-the-night.mp3',
    img:'images/beautiful-architecture-and-building-of-tokyo-cityscape.jpg'},

    {titulo:'Fim de semana no rio',artista:'Teto',src:'songs/fim-de-semana-no-rio.mp3',
    img:'images/landscape-of-rio-de-janeiro-surrounded-by-the-sea-under-a-blue-sky-in-brazil.jpg'},

    {titulo:'Dancing in the dark',artista:'joji',src:'songs/slow-dancing-in-the-dark.mp3',
    img:'images/28574.jpg'}
];



let musica= document.querySelector('audio');
let indexMusica=0

let player=document.querySelector('.player');
let imagem = document.querySelector('img');
let nomeMusic= document.querySelector('.description h2')
let nomeCantor= document.querySelector('.description i')
renderMusica(indexMusica)

let volumeButton=document.querySelector('.volumeButton');
let volumecontrol=document.querySelector('.volume-control');
let volumepainel=document.querySelector('.volume-painel');
    //pega o input dentro do volumepainel
let volumeRange=volumepainel.querySelector('input');
    //pega o volume-progress dentro da div painel 
let volumeProgress=volumepainel.querySelector('.volume-progress');

let duracaoMusica = document.querySelector('.fim');

document.querySelector('.highAudio').addEventListener('click',mutarpagina)
document.querySelector('.audio').addEventListener('click',mutarpagina);
document.querySelector('.muted').addEventListener('click',desmutarpg);

document.querySelector('.botao-play').addEventListener('click',tocarMusica);
document.querySelector('.botao-pause').addEventListener('click',pausarMusica);

document.querySelector('.anterior').addEventListener('click',() =>{
    let barra = document.querySelector('progress');
    barra.style.width=0
    
    document.querySelector('.botao-pause').style.display='none';
    document.querySelector('.botao-play').style.display='block';
    indexMusica --;
    if(indexMusica < 0){
        indexMusica=2
    }
    renderMusica(indexMusica);
})
document.querySelector('.proxima').addEventListener('click',() =>{
    let barra = document.querySelector('progress');
    barra.style.width=0
    
    document.querySelector('.botao-pause').style.display='none';
    document.querySelector('.botao-play').style.display='block';
    indexMusica ++;
    if(indexMusica > 2){
        indexMusica=0
    }
    renderMusica(indexMusica);
})

                    //verefica se a musica esta tocando
musica.addEventListener('timeupdate',progressBarra);

//autoplay           ended verefica se a musica terminou
musica.addEventListener('ended',function(){
    console.log('sera?')
    indexMusica ++;
    if(indexMusica > 2){
        indexMusica=0
    }
    renderMusica(indexMusica);
    musica.play()
})



//FUNCOES

//carrega as informacoes das musicas 
function renderMusica(index){
    musica.setAttribute('src',musicas[index].src);
    musica.addEventListener('loadeddata',()=>{
        nomeMusic.textContent= musicas[index].titulo;
        nomeCantor.textContent= musicas[index].artista;
        imagem.src = musicas[index].img;
        duracaoMusica.textContent=segundosParaMinutos( Math.floor(musica.duration));
    })
}


function tocarMusica(){
    musica.play()
    document.querySelector('.botao-pause').style.display='block';
    document.querySelector('.botao-play').style.display='none';

}
function pausarMusica(){
    musica.pause()
    document.querySelector('.botao-pause').style.display='none';
    document.querySelector('.botao-play').style.display='block';
}

function progressBarra(){
    let barra = document.querySelector('progress');

    //tempo atual dividido pela duracao ,multiplicado por 100 para mexer a barra do progresso
    barra.style.width = Math.floor((musica.currentTime / musica.duration) *100) + '%';
                //math.floor deixa numeros arredondados

    let tempoDecorrido = document.querySelector('.inicio');
    tempoDecorrido.textContent=segundosParaMinutos( Math.floor(musica.currentTime));
    //muda o conteudo do texto

}

function segundosParaMinutos(segundos){
        //olha o video pra entender
    let campoMinutos = Math.floor(segundos / 60);
    let campoSegundos = segundos % 60;

    if(campoSegundos < 10){
        campoSegundos = '0' + campoSegundos
    }

    return campoMinutos+':' +campoSegundos;
}


//botao de audio
function mutarpagina(){
    if( musica.muted ){
        musica.muted = false;
    }
    else{
        musica.muted= true;
        volumeRange.value=0 
        document.querySelector('.muted').style.display='block'
        document.querySelector('.audio').style.display='none'
        document.querySelector('.highAudio').style.display='none'
    }
}
function desmutarpg(){
    musica.muted = false;
    volumeRange.value= musica.volume * 100;
    document.querySelector('.muted').style.display='none'
    document.querySelector('.audio').style.display='block'
}

volumeRange.addEventListener('input',function(e){
    volumeProgress.style.width=volumeRange.value + '%';

    musica.volume =volumeRange.value /100;

    if(volumeRange.value > 50){
        document.querySelector('.highAudio').style.display='block';
        document.querySelector('.audio').style.display='none';
    }if(volumeRange.value <= 50){
        document.querySelector('.highAudio').style.display='none';
        document.querySelector('.audio').style.display='block';
        document.querySelector('.muted').style.display='none'
    }if(volumeRange.value <= 0){
        document.querySelector('.highAudio').style.display='none';
        document.querySelector('.audio').style.display='none';
        document.querySelector('.muted').style.display='block'
    }

},false);

//evento pra quando o mouse passa por cima aparece o volume control
volumeButton.addEventListener('mouseenter',function(){
    volumecontrol.style.margin= '0px 2px 0px 0px'
    volumepainel.style.width= '52px';
});

player.addEventListener('mouseleave',function(){
    volumecontrol.style.margin= '0px 0px 0px 0px'
    volumepainel.style.width= '0px';
});

setInterval(function(){
    volumeProgress.style.width = volumeRange.value + '%';
},)




