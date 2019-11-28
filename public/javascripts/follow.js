let startFollowing = async () => {
    const data = {
        "name": "fausto"
    }
    const rawResponse = await fetch(local_api + '/users/follow/start', {
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

$('div.follow button#startFollow').click(startFollowing);
$('div.follow button#endFollow').click(()=>{

});