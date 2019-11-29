// mdc.ripple.MDCRipple.attachTo(document.querySelector('button'));
const url = 'https://aadam.herokuapp.com';
const local_api = 'http://localhost:5000'
var contenido = [];
var texto = '';
var fontListening = '12em';
var imagenes = [];
var videos = [];
var relatedMedia = [];

$(document).ready(function () {
    animationListening();
});

// Speech recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// Sockets 
// const socket = io('http://localhost:5000/');
// socket.on('connect', function () {
//     // socket.emit('holaa', { data: 'I\'m connected!' });
//     console.log('Socket connected')

// });
// socket.on('values', (values) => {
//     console.log(values)
//     // console.log(JSON.parse(values));
// });

// Clock
var interval = setInterval(function () {
    var momentNow = moment();
    $('div.time span').html(momentNow.format('hh:mm'));
}, 100);

// Functions

let updateText = () => {
    // Get content
    $.get(url + '/api/texto', async (data) => {
        for (var i = 0; i < data.length; i++) {
            var id = data[i].fileId;
            await $.get(url + '/api/documentos/' + id, function (text) {
                contenido.push(text);
                texto += '\n\n' + text;
            });
        }
        $('div.content div.text p').html(texto);
        console.log('Contenido listo!');
    });
}

let updateImages = async () => {
    // Get images

    $.get(url + '/api/imagenes/ready', async (data) => {
        console.log(data);
        $('div.content div.images div.imagen').remove();
        imagenes = data.imagenes;
        for (let i = 0; i < data.imagenes.length; i++) {
            let fileId = data.imagenes[i].fileId
            let description = data.imagenes[i].description
            let div = '<div class=\"imagen\"><img src=\"' + url + '/api/imagenes/' + fileId + '\" alt=\"' + description + '\"></div>';
            $('div.content div.images').append(div);
        }
    });
}

let updateVideos = () => {
    // Get videos
    $.get(url + '/api/videos', async (data) => {
        console.log(data);
        $('div.content div.videos div.video').remove();
        videos = data.videos;
        for (let i = 0; i < data.videos.length; i++) {
            let fileId = data.videos[i].fileId
            let description = data.videos[i].description
            let div = '<div class=\"video\"><video src=\"' + url + '/api/videos/' + fileId + '\" alt=\"' + description + '\" controls></div>';
            $('div.content div.videos').append(div);
        }
    });
}

let updateRelatedMedia = () => {
    let media = relatedMedia;
    let div = null;
    $('div.speech div.center div#multimedia > div > div').remove();
    for (let i = 0; i < media.length; i++) {
        let fileId = media[i].fileId
        let description = media[i].description
        if (media[i].type.includes('image'))
            div = '<div class=\"imagen\"><img src=\"' + url + '/api/imagenes/' + fileId + '\" alt=\"' + description + '\"></div>';
        else
            div = '<div class=\"video\"><video src=\"' + url + '/api/videos/' + fileId + '\" alt=\"' + description + '\" controls></div>';
        $('div.speech div.center div#multimedia > div').append(div);
    }
}

let listen = e => {
    // Start speech recognition
    recognition.start();
    $('div.speech div.center').css('border-radius', '50%');
    $('div.speech').css('display', 'flex');
    $('div.speech div.center i').css('display', 'flex');
    $('div.speech').animate({ backgroundColor: 'rgba(0, 0, 0, 0.60)' }, 300);
}

let stopListening = e => {
    recognition.stop();
    responsiveVoice.cancel();
    $('div.speech div.center div#waves').css('display', 'none');
    $('div.speech div.center div#waves > div').remove();
    $('div.speech div.center div#multimedia').css('display', 'none');
    $('div.speech div.center').css('border-radius', '50%');
    $('div.speech p').html('');
    $('div.speech').animate({ backgroundColor: 'rgba(0, 0, 0, 0)' }, 300, () => {
        $('div.speech').css('display', 'none');
    });
}

let follow = e => {
    $('div.buttons').css('display', 'none');
    $('div.follow').css('display', 'flex');
    $('nav div.circle > button i').attr('class', 'fas fa-map-marker-alt');
    $('nav div.circle > button i').html('');
    $('nav > div > button#back').css('display', 'flex');
}

let content = e => {
    $('div.buttons').css('display', 'none');
    $('div.content').css('display', 'flex');
    $('nav div.circle > button').css('display', 'none');
    $('nav div.circle div.contentButtons').css('display', 'flex');
    $('div.content div.text p').html(texto);
    $('nav > div > button#back').css('display', 'flex');
}

let back = e => {
    $('div.buttons').css('display', 'flex');
    $('div.follow').css('display', 'none');
    $('div.content').css('display', 'none');
    $('nav div.circle > button i').attr('class', 'material-icons');
    $('nav div.circle > button i').html('settings');
    $('nav div.circle > button').css('display', 'flex');
    $('nav div.circle div.contentButtons').css('display', 'none');
    $('nav > div > button#back').css('display', 'none');
}

let showText = e => {
    $('div.content div.text').css('display', 'flex');
    $('div.content div.images').css('display', 'none');
    $('div.content div.videos').css('display', 'none');
    $('div.content div.background div.back-text').css('background-color', '#e0e0e0')
    $('div.circle div.contentButtons button').css('background-color', '#c4c4c400');
    $('div.circle div.contentButtons button#text').css('background-color', '#c4c4c4');
}

let showImages = e => {
    $('div.content div.text').css('display', 'none');
    $('div.content div.images').css('display', 'flex');
    $('div.content div.videos').css('display', 'none');
    $('div.content div.background div.back-text').css('background-color', '#e0e0e000')
    $('div.circle div.contentButtons button').css('background-color', '#c4c4c400');
    $('div.circle div.contentButtons button#images').css('background-color', '#c4c4c4');
}

let showVideos = e => {
    $('div.content div.text').css('display', 'none');
    $('div.content div.images').css('display', 'none');
    $('div.content div.videos').css('display', 'flex');
    $('div.content div.background div.back-text').css('background-color', '#e0e0e000')
    $('div.circle div.contentButtons button').css('background-color', '#c4c4c400');
    $('div.circle div.contentButtons button#videos').css('background-color', '#c4c4c4');
}

let askQuestion = async (context, question) => {
    // Ask question to Deeppavlov server
    const data = {
        "context": [context],
        "question": [question]
    }
    const rawResponse = await fetch(local_api + '/answer', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const content = await rawResponse.json();
    // console.log(content.answer);
    return content.answer;
};

let animationListening = () => {
    $('div.speech div.center i').animate({ fontSize: fontListening }, 200, () => {
        fontListening = fontListening === '10em' ? '12em' : '10em';
        setTimeout(() => {
            animationListening();
        }, 200);
    });
}

let getRelatedMedia = (text) => {
    text = text.toLowerCase();
    let result = [];
    let media = imagenes.concat(videos);
    let words = 0;
    console.log(media);
    for (var i = 0; i < media.length; i++) {
        words = 0;
        for (var j = 0; j < media[i].keywords.length; j++)
            if (text.includes(media[i].keywords[j].toLowerCase()))
                words += 1;
        if (words > 0)
            result.push(media[i]);
    }
    return result;
}

// Events
$('div.buttons > button#talk').click(listen);
$('div.buttons > button#follow').click(follow);
$('div.buttons > button#content').click(content);
$('nav > div > button#back').click(back);
$('div.circle div.contentButtons button#text').click(showText);
$('div.circle div.contentButtons button#images').click(showImages);
$('div.circle div.contentButtons button#videos').click(showVideos);
$('div.speech > button#close').click(stopListening);

// Initialize content
updateText();
updateImages();
updateVideos();
