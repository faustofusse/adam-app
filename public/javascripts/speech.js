recognition.onstart = () => {
    console.log("Listening...");
}
recognition.onerror = (e) => {
    console.error('Error: ' + e);
    stopListening();
}
recognition.onresult = (e) => {
    // $('p').html(e.results[0][0].transcript);
    var transcript = e.results[0][0].transcript;
    console.log('Pregunta: ' + transcript);
    transcript = '¿' + transcript + '?';
    $('div.speech p').html(transcript);
    askQuestion(texto, transcript).then(rta => {
        console.log('Respuesta: ' + rta);

        initializeWaves();
        $('div.speech p').html(rta[0].toUpperCase() + rta.slice(1) + '.');
        if (responsiveVoice.voiceSupport()) {
            responsiveVoice.speak(rta, 'Spanish Latin American Male', { onstart: onStartVoice, onend: onEndVoice });
        } else {
            alert(rta);
        }
    });
}

onStartVoice = () => {
    $('div.speech div.center').animate({ borderRadius: '5em' }, 400);
    $('div.speech div.center i').css('display', 'none');
    $('div.speech div.center div#waves').slideDown();
}

onEndVoice = () => {
    $('div.speech div.center div#waves').slideUp();
}