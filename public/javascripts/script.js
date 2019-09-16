// mdc.ripple.MDCRipple.attachTo(document.querySelector('button'));

const url = 'https://aadam.herokuapp.com';
var contenido = [];
var texto = '';

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
        }
    });
}

// Talk button
$('button#talk').click(() => {
    recognition.start();
});

// Clock
var interval = setInterval(function () {
    var momentNow = moment();
    $('div.time span').html(momentNow.format('hh:mm'));
}, 100);

// Ask question to Deeppavlov server
var askQuestion = async (context, question) => {
    const data = {
        "context": [context],
        "question": [question]
    }
    const rawResponse = await fetch('http://localhost:5000/squad', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const content = await rawResponse.json();
    const response = content[0][0];
    console.log(content[0]);
    return response;
};

$.get(url + '/api/texto', async function (data) {
    for (var i = 0; i < data.length; i++) {
        var id = data[i].fileId;
        await $.get(url + '/api/documentos/' + id, function (text) {
            contenido.push(text);
            texto += '\n' + text;
        });
    }
    console.log('Contenido listo!');
    // console.log(contenido);
    // console.log(texto);
    /*askQuestion(texto, "Que es un texto?").then(value => {
        console.log(value);
    });*/
});