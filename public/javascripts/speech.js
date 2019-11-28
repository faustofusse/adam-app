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
            relatedMedia = getRelatedMedia(transcript + rta);
            updateRelatedMedia();
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
    $('div.speech p').html('');
    $('div.speech div.center').animate({ borderRadius: '2em' }, 400);
    $('div.speech div.center div#waves').slideUp();
    if (relatedMedia.length > 0)
        $('div.speech div.center div#multimedia').slideDown();
    else
        stopListening();
}

