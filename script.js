const songs = [
  {
    title: "Ganesh Stuti",
    artist: "Dark Devil",
    src: "Music/Ganeshji shloka.mp3",
    cover: "Music/ganapatibapa.jpg"
  },
  {
    title: "Mahadev ni aarti",
    artist: "Alpa patel",
    src: "Music/Mahadev Ni Aarti.mp3",
    cover: "Music/mahadev.jpg"
  }
];

let currentSong = 0;
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progress = document.getElementById("progress");

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
  cover.src = song.cover;
}

const searchInput = document.getElementById("search");
const songList = document.getElementById("song-list");

// Render song list
function renderSongList() {
  songList.innerHTML = ""; // clear previous
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.addEventListener("click", () => {
      currentSong = index;
      loadSong(songs[currentSong]);
      playSong();
      isPlaying = true;
    });
    songList.appendChild(li);
  });
}

// Search filter
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchTerm) ||
    song.artist.toLowerCase().includes(searchTerm)
  );

  songList.innerHTML = "";
  filteredSongs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;

    // Make sure to find correct index in original array
    const realIndex = songs.findIndex(s => s.title === song.title);
    li.addEventListener("click", () => {
      currentSong = realIndex;
      loadSong(songs[currentSong]);
      playSong();
      isPlaying = true;
    });

    songList.appendChild(li);
  });
});
function playSong() {
  audio.play();
  playBtn.textContent = "⏸️";
}
function pauseSong() {
  audio.pause();
  playBtn.textContent = "▶️";
}
let isPlaying = false;
playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
  isPlaying = !isPlaying;
});
nextBtn.addEventListener("click", () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(songs[currentSong]);
  playSong();
  isPlaying = true;
});
prevBtn.addEventListener("click", () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(songs[currentSong]);
  playSong();
  isPlaying = true;
});
// Update progress bar and times
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;
  progress.value = (audio.currentTime / audio.duration) * 100;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});
// Seek in track
progress.addEventListener("input", () => {
  audio.currentTime = (progress.value * audio.duration) / 100;
});
audio.addEventListener("ended", () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(songs[currentSong]);
  playSong();
  isPlaying = true;
});
// Load first song
loadSong(songs[currentSong]);
renderSongList(); // display all songs initially
function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}
