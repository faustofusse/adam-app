let updateUsers = () => {
    $.get(local_api + '/users', (res) => {
        let keys = Object.keys(res.success);
        $('div.follow div.names > div').remove();
        for (let i = 0; i < keys.length; i++) {
            if (keys[i] !== 'unknown') {
                let div = '<div><button id="' + keys[i] + '">' + keys[i] + '</button><button id="' + keys[i] + '"><i style="font-size: 1em; color:red;" class="material-icons">delete</i></button></div>';
                $('div.follow div.names').append(div);
            }
        }
        $('div.follow div.names div button:first-of-type').click(buttonUser);
        $('div.follow div.names div button:last-of-type').click(buttonDelete);
    });
}

let deleteUser = async (name) => {
    const url = local_api + '/users/' + name;
    const rawResponse = await fetch(url, {
        method: 'DELETE'
    });
    const content = await rawResponse.json();
    console.log(content);
}

let following = async (follow, name) => {
    const data = {
        "name": name
    }
    const url = local_api + '/users/follow/' + (follow ? 'start' : 'end');
    console.log(url);
    const rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const content = await rawResponse.json();
    console.log(content);
}

let buttonStart = () => {
    // following(true);
    if ($('div.follow div.names').is(':visible'))
        $('div.follow div.names').slideUp();
    else
        $('div.follow div.names').slideDown();
}

let buttonEnd = () => {
    following(false, null);
    $('div.follow button#endFollow').animate({ backgroundColor: '#03E3C8', color: '#000' }, 200);
    $('div.follow button#endFollow').html('EMPEZAR');
    $('div.follow button#endFollow').attr('id', 'startFollow');
    $('div.follow button#startFollow').unbind('click');
    $('div.follow button#startFollow').on('click', buttonStart);
}

let buttonUser = (e) => {
    let id = e.target.attributes[0].value;
    $('div.follow div.names').slideUp();
    following(true, id);
    $('div.follow button#startFollow').animate({ backgroundColor: '#ef5350', color: '#fff' }, 200);
    $('div.follow button#startFollow').html('TERMINAR');
    $('div.follow button#startFollow').attr('id', 'endFollow');
    $('div.follow button#endFollow').unbind('click');
    $('div.follow button#endFollow').on('click', buttonEnd);
}

let buttonDelete = (e) => {
    let id = e.currentTarget.attributes[0].value;
    deleteUser();
    updateUsers();
}

let buttonTrain = async (e) => {
    var name = prompt("Ingresa el nombre del nuevo usuario a entrenar:");
    const data = {
        "name": name,
        "count": 30
    }
    const url = local_api + '/users';
    console.log(url);
    const rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const content = await rawResponse.json();
    console.log(content);
}

$('div.follow button#startFollow').click(buttonStart);
$('div.follow button#endFollow').click(buttonEnd);
$('div.follow button#train').click(buttonTrain);

updateUsers();