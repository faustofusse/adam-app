// mdc.ripple.MDCRipple.attachTo(document.querySelector('button'));
const url = 'https://aadam.herokuapp.com';
const local_api = 'http://localhost:5000'
var contenido = [];
var texto = '';

// Sockets 
const socket = io('http://localhost:5000/');
socket.on('connect', function () {
    // socket.emit('holaa', { data: 'I\'m connected!' });
    console.log('Socket connected')

});
socket.on('values', (values) => {
    console.log(values)
    // console.log(JSON.parse(values));
});

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

// Get images
let getImages = async () => {
    // fetch(url + '/api/imagenes/ready', {
    //     method: 'GET',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     }
    // }).then(res => {
    //     console.log(res.json())
    // }).catch(e =>{
    //     console.log(e)
    // });
    // $.ajax(url + '/api/imagenes/ready',
    //     {
    //         method: 'GET',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         }
    //     }).then(res => {
    //         console.log(res)
    //     }).catch(e => {
    //         console.log(e)
    //     });
    // console.log(rawResponse);
}
getImages()
$.get(url + '/api/imagenes/ready', async (data) => {
    console.log(data)
    for (let i = 0; i < data.imagenes.length; i++) {
        let fileId = data.imagenes[i].fileId
        let description = data.imagenes[i].description
        let div = '<div class=\"imagen\"><img src=\"' + url + '/api/imagenes/' + fileId + '\" alt=\"' + description + '\"></div>';
        $('div.content div.images').append(div);
    }
});

// Get videos
$.get(url + '/api/videos', async (data) => {
    console.log(data)
    for (let i = 0; i < data.videos.length; i++) {
        let fileId = data.videos[i].fileId
        let description = data.videos[i].description
        let div = '<div class=\"video\"><video src=\"' + url + '/api/videos/' + fileId + '\" alt=\"' + description + '\" controls></div>';
        $('div.content div.videos').append(div);
    }
});

// Speech recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.onstart = () => {
    console.log("Listening...");
}
recognition.onresult = (e) => {
    // $('p').html(e.results[0][0].transcript);
    var transcript = e.results[0][0].transcript;
    console.log('Pregunta: ' + transcript);
    askQuestion(texto, transcript).then(rta => {
        console.log('Respuesta: ' + rta);
        // alert(rta);
        if (responsiveVoice.voiceSupport()) {
            responsiveVoice.speak(rta, 'Spanish Latin American Male');
        } else {
            alert(rta);
        }
    });
}

// Clock
var interval = setInterval(function () {
    var momentNow = moment();
    $('div.time span').html(momentNow.format('hh:mm'));
}, 100);


// Functions

let listen = e => {
    // Start speech recognition
    recognition.start();
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
    const rawResponse = await fetch(local_api + '/squad/answer', {
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

// Events
$('div.buttons > button#talk').click(listen);
$('div.buttons > button#follow').click(follow);
$('div.buttons > button#content').click(content);
$('nav > div > button#back').click(back);
$('div.circle div.contentButtons button#text').click(showText);
$('div.circle div.contentButtons button#images').click(showImages);
$('div.circle div.contentButtons button#videos').click(showVideos);

follow(null)