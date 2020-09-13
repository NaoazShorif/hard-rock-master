const apiURL = 'https://api.lyrics.ovh';
const catchArtistName = document.getElementById('searchName');
const searchButton = document.getElementById('searchBtn');
searchButton.addEventListener('click',() => {
    document.getElementById('showResult').innerHTML = '';
    document.getElementById('showLyric').innerHTML = '';
    fetchData(searchName.value);
});

function fetchData(artistName){
    fetch(`${apiURL}/suggest/${artistName}`)
    .then (res => res.json())
    .then (data => {
        fetchedData = data;
        showMatches(fetchedData)
    })
}

// show matching results
function showMatches(data){
    for (let i = 0; i < 10; i++) {
        const singleData = data.data[i];
        document.getElementById('showResult').innerHTML += `  <div class="single-result row align-items-center my-3 p-3">
        <div class="col-md-9">
            <h3 class="lyrics-name">${singleData.title}</h3>
            <p class="author lead">Album by <span>${singleData.artist.name}</span></p>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button class="btn btn-success" onClick='getLyrics(${i})'>Get Lyrics</button>
        </div>
    </div>`
        
    }
}
// show lyrics....

function getLyrics (index){
    document.getElementById('showLyric').innerHTML = '';
    const title = fetchedData.data[index].title;
    const artist = fetchedData.data[index].artist.name;
     fetch (`${apiURL}/v1/${artist}/${title}`)
    .then (res => res.json())
    .then (data => {
        if (data.lyrics === undefined){
            alert('Lyric is not found');
        }else {
            document.getElementById('showLyric').innerHTML = `
            <h2 class="text-success mb-4">${title}</h2>
            <pre class="lyric text-white">
        ${data.lyrics}
             </pre>`
        }
    })
}

// done