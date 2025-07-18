console.log("let begain javascript")
// we using api for call songs
// http://127.0.0.1:3000/songs/ - this is side local host server songs is the foolder in this site throu which we call api

let songs;
let currentSongIndex = 0;
let currentSong = new Audio();
let pause = document.querySelector(".songplaybutton").getElementsByTagName("img")[1];
let currentfolder;


const current = document.getElementById("current");
const total = document.getElementById("total");


async function getsongs(folder) {
    currentfolder = folder;
    let a = await fetch(`http://127.0.0.1:3000/${folder}/`)
    let response = await a.text()
    // console.log(response)
    let div = document.createElement("div");
    div.innerHTML = response;
    let anchortag = div.getElementsByTagName("a");
    songs = [];
    // anchor tag work as string it run all anchortag in which link is present
    for (let i = 0; i < anchortag.length; i++) {
        const element = anchortag[i];
        //element.href.endsWith("mp3") using navigation dom 
        if (element.href.endsWith("mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1])
            // it give 2 array after split 
            //["http://127.0.0.1:3000,David_Kushner_-_Daylight.mp3"]
            // we print song name only using this = [1]
        }
    }
    return songs;
}




// function for play music
// track = songname comming from calldata function
const playMusic = (track, pause = false) => {
    currentSong.src = `/${currentfolder}/` + track; // stored in currentSong variable
    // this is the path of song in which we play song
    if (!pause) {
        currentSong.play()
        playMusic.src = "img/pause.svg"
    }
    // currentSong.play();
    // pause.src = "Pausemusic.svg";
    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
    currentSongIndex = songs.indexOf(track);
}




// function to convert seconds to minutes and seconds format
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}


function updateLibraryUI(folderSongs) {
    let songUrl = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    songUrl.innerHTML = ""; // clear old songs

    for (const song of folderSongs) {
        songUrl.innerHTML += `<li>
            <img src="music.svg" alt="image not available" style="margin: 4px;">
            <div class="info">
                <div>${song.replaceAll("%20", " ")}</div>
                <div>Swayam Verma</div>
            </div>
            <div class="playnow">Play Now</div>
            <div class="playbuttonlib">
                <img src="playmusic.svg" alt="">
            </div>
        </li>`;
    }

    // Reattach event listeners
    let allSongs = Array.from(document.querySelector(".songlist").getElementsByTagName("li"));
    allSongs.forEach(songItem => {
        songItem.addEventListener("click", () => {
            let songName = songItem.querySelector(".info").firstElementChild.innerHTML.trim();
            playMusic(songName);
        });
    });
}

async function cards() {
    console.log("displaying albums")
    let a = await fetch(`/songs/`)
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a")
    let cardContainer = document.querySelector(".cardcontainer")
    let array = Array.from(anchors)
    for (let index = 0; index < array.length; index++) {
        const e = array[index];
        if (e.href.includes("/songs") && !e.href.includes(".htaccess")) {
            let folder = e.href.split("/").slice(-2)[0]
            // Get the metadata of the folder
            let a = await fetch(`/songs/${folder}/info.json`)
            let response = await a.json();
            cardContainer.innerHTML = cardContainer.innerHTML + ` <div data-folder="${folder}" class="card1">
                        <div class="play">
                            <svg width="40" height="40" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="30" cy="30" r="30" fill="#1ED760" />
                                <polygon points="24,18 24,42 42,30" fill="black" />
                            </svg>
                        </div>
                        <img src="/songs/${folder}/cover.jpg" alt="" class="card1img">
                        <h2>${response.title}</h2>
                        <p>${response.discription}</p>
                    </div>`
        }
    }
}





async function calldata() {
    // get all songs array 
    let song = await getsongs("songs/favorite");
    // it will add all url in array

    playMusic(song[0], true);

    updateLibraryUI(song);

    await cards()


    // put this code to update libraray to albums

    // console.log(song)
    // let songUrl = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    // for (const i of song) {
    //     // note: replaceAll("%20"," ") use replaceall to remove %20 code from url 
    //     songUrl.innerHTML = songUrl.innerHTML + `<li><img src="music.svg" alt="image not available" style="margin: 4px;">
    //                             <div class="info">
    //                                 <div>${i.replaceAll("%20", " ")}</div>
    //                                 <div>Swayam verma</div>
    //                             </div>
    //                             <div class="playnow">Play Now</div>
    //                             <div class="playbuttonlib">
    //                                 <img src="playmusic.svg" alt="">
    //                             </div>
    //      </li>`;
    //     // atach an event listiner to all songs 
    // }

    /*write code in professional way
     Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())

        })
    })*/

    // this is for beginer 

    // // Step 1: Select the .songlist container
    // let songList = document.querySelector(".songlist");
    // // Step 2: Get all <li> elements inside .songlist
    // let allSongs = songList.getElementsByTagName("li");
    // // Step 3: Convert HTMLCollection to an Array so we can use forEach
    // let songArray = Array.from(allSongs);
    // // console.log(songArray);
    // // Step 4: Loop through each <li> element
    // songArray.forEach(function (songItem) {
    //     // Step 5: Add click event to each song
    //     songItem.addEventListener("click", function () {
    //         // Step 6: Get the song name from the .info section inside the <li>
    //         let songName = songItem.querySelector(".info").firstElementChild.innerHTML.trim();
    //         console.log("Selected song:", songName);
    //         // Step 7: Play the selected song by calling playMusic function
    //         playMusic(songName);
    //     });
    // });

    // console.log(song[2])


    // use as a try to check music is playing or not
    /* this code is use to play song 
     var audio = new Audio(song[2]);
     audio.play();*/

    /*audio.addEventListener("loadeddata", () => {
        let duration = audio.duration;
        // The duration variable now holds the duration (in seconds) of the audio clip
        console.log(duration)
    });*/

    // add event listener to play next previous button



    let pause = document.querySelector(".songplaybutton").getElementsByTagName("img")[1];
    pause.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            pause.src = "Pausemusic.svg";
        } else {
            currentSong.pause();
            pause.src = "playmusic.svg";
        }
    });


    // add event listener to update time according to song


    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".progress").style.width = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    });

    // Add an event listener to seekbar
    const seekBar = document.querySelector(".seek-bar");
    const progressBar = document.querySelector(".progress");

    // 🖱️ 1. Mouse click to seek
    seekBar.addEventListener("click", (e) => {
        const rect = seekBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percent = (clickX / rect.width) * 100;

        progressBar.style.width = percent + "%";

        if (currentSong.duration) {
            currentSong.currentTime = (percent / 100) * currentSong.duration;
        }
    });

    // ⌨️ 2. Arrow key seek (← and →) functionaing enable for ching song and seek bar

    let focusedSection = null;

    document.querySelector(".abovebar").addEventListener("click", () => {
        focusedSection = "songchange";
    });

    document.querySelector(".seek-bar-container").addEventListener("click", () => {
        focusedSection = "seekbar";
    });


    document.addEventListener("keydown", (e) => {
        if (!currentSong.duration) return;

        if (focusedSection === "seekbar") {
            // Seek bar control
            if (e.code === "ArrowRight") {
                currentSong.currentTime = Math.min(currentSong.currentTime + 5, currentSong.duration);
            } else if (e.code === "ArrowLeft") {
                currentSong.currentTime = Math.max(currentSong.currentTime - 5, 0);
            }
        }

        if (focusedSection === "songchange") {
            // Change song control
            if (e.code === "ArrowRight") {
                currentSongIndex = (currentSongIndex + 1) % songs.length;
                playMusic(songs[currentSongIndex]);
            } else if (e.code === "ArrowLeft") {
                currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
                playMusic(songs[currentSongIndex]);
            }
        }
    });


    // add event listiner to play and pause music with spacebar
    document.addEventListener("keydown", (event) => {
        // Check if spacebar is pressed and not in an input/textarea
        if (event.code === "Space" && !event.target.matches("input, textarea")) {
            event.preventDefault(); // Prevent page scroll
            if (currentSong.paused) {
                currentSong.play();
                pause.src = "Pausemusic.svg"; // update button icon
            } else {
                currentSong.pause();
                pause.src = "playmusic.svg"; // update button icon
            }
        }
    });

    // add event listener to next and previous button
    // ▶️ Next song
    document.querySelector(".nextplay").addEventListener("click", () => {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        playMusic(songs[currentSongIndex]);
    });

    // ◀️ Previous song
    document.querySelector(".prevoisplay").addEventListener("click", () => {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        playMusic(songs[currentSongIndex]);
    });


    // add event listener to hamburger icon open and close as a sidebar

    document.querySelector(".hamburgersvg").addEventListener("click", () => {
        document.querySelector(".right").style.left = "0"
    })
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".right").style.left = "-290px"
    })

    // volume button 
    const volumeBtn = document.querySelector('.volumesvg');
    const volumeSlider = document.querySelector('.volume-slider');

    // Toggle slider visibility
    volumeBtn.addEventListener('click', () => {
        volumeSlider.style.display = volumeSlider.style.display === 'block' ? 'none' : 'block';
    });

    // Adjust volume and switch icon
    volumeSlider.addEventListener('input', () => {
        const vol = parseFloat(volumeSlider.value);
        currentSong.volume = vol;

        if (vol === 0) {
            volumeBtn.src = 'mute.svg'; // switch to mute icon
        } else {
            volumeBtn.src = 'volume.svg'; // switch back to volume icon
        }
    });

    /*Property	Refers To
    event.target	The actual element that triggered the event
    event.currentTarget	The element that the event listener is attached to 
    that means when we atrget anything it iwll target according to click but
    when we use current target when we click on it , it will aminy targ that class or id that u mentioned*/

    Array.from(document.getElementsByClassName("card1")).forEach(e => {
        e.addEventListener("click", async item => {
            songs = await getsongs(`songs/${item.currentTarget.dataset.folder}`);
            updateLibraryUI(songs); // <-- this is the missing line to update library
            playMusic(songs[0]);
        });
    });


}

// getsongs()
calldata();