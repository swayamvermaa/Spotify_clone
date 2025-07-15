console.log("let begain javascript")
// we using api for call songs
// http://127.0.0.1:3000/songs/ - this is side local host server songs is the foolder in this site throu which we call api

async function getsongs() {
    let a = await fetch("http://127.0.0.1:3000/songs/")
    // await a.text()- because it take time to fetch  data from api
    let response = await a.text()
    // if we want in json a.json();
    console.log(response)
}
// async function calldata() {
//     let songs = await getsongs();
//     console.log(songs)
// }
getsongs()


/* output in text form

		<!DOCTYPE html>
		<html>
			<head>
				<style>
					table td {
						padding:4px;
					}
				</style>
				<title>Index of /songs/</title>
			</head>
			<body>
			<h1>Index of /songs/</h1>

			<table>
				<th>Name</th><th>Size</th><th>Date Modified</th>
				
				<tr>
				<td><a href="../">../</a></td>
				<td></td>
				<td></td>
				</tr>

				<tr>
				<td><a href="\songs\Adele_-_Set_Fire_to_the_Rain.mp3">Adele_-_Set_Fire_to_the_Rain.mp3</a></td>
				<td>4.6 MB</td>
				<td>7/13/25, 9:48:38</td>
				</tr>

				<tr>
				<td><a href="\songs\David_Kushner_-_Daylight.mp3">David_Kushner_-_Daylight.mp3</a></td>
				<td>5.8 MB</td>
				<td>7/13/25, 9:51:02</td>
				</tr>

				<tr>
				<td><a href="\songs\luffy_sings.mp3">luffy_sings.mp3</a></td>
				<td>423.3 kB</td>
				<td>6/05/25, 23:41:56</td>
				</tr>

				<tr>
				<td><a href="\songs\My-Heart-Is-Stereo.mp3">My-Heart-Is-Stereo.mp3</a></td>
				<td>3.3 MB</td>
				<td>7/13/25, 10:45:46</td>
				</tr>

				<tr>
				<td><a href="\songs\pagalworld.com.mx-See You Again.mp3">pagalworld.com.mx-See You Again.mp3</a></td>
				<td>3.6 MB</td>
				<td>7/13/25, 10:45:01</td>
				</tr>

				<tr>
				<td><a href="\songs\Sahiba Priya Saraiya 320 Kbps.mp3">Sahiba Priya Saraiya 320 Kbps.mp3</a></td>
				<td>8.3 MB</td>
				<td>7/13/25, 10:42:36</td>
				</tr>

				<tr>
				<td><a href="\songs\Simroon Tera Naam Yaariyan 2 128 Kbps.mp3">Simroon Tera Naam Yaariyan 2 128 Kbps.mp3</a></td>
				<td>4.0 MB</td>
				<td>7/13/25, 10:37:51</td>
				</tr>

				<tr>
				<td><a href="\songs\snail_call.mp3">snail_call.mp3</a></td>
				<td>298.5 kB</td>
				<td>6/05/25, 23:43:10</td>
				</tr>

				<tr>
				<td><a href="\songs\Teri Deewani (PenduJatt.Com.Se).mp3">Teri Deewani (PenduJatt.Com.Se).mp3</a></td>
				<td>3.8 MB</td>
				<td>7/13/25, 10:39:29</td>
				</tr>

				<tr>
				<td><a href="\songs\Title Track Shiddat 320 Kbps.mp3">Title Track Shiddat 320 Kbps.mp3</a></td>
				<td>8.9 MB</td>
				<td>7/13/25, 10:43:53</td>
				</tr>

			</table>
			</body>

			<script type="text/javascript" src="/___vscode_livepreview_injected_script"></script>
		</html>
		
*/


/*
let response = await a.text()
if we dont use await in it the promise is show pendiing
*/