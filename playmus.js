"use strict";
const musicTitleEl = document.getElementById("music_title");
const playerProgressEl = document.getElementById("player_progress");
const progressEl = document.getElementById("progress");
const currentTimeEl = document.getElementById("current_time");
const durationEl = document.getElementById("duration");
const prevBtnEl = document.getElementById("prev");
const playvBtnEl = document.getElementById("play");
const nextvBtnEl = document.getElementById("next");
const songs = [
  {
    path: "music/zdravstvuyte.mp3",
    displayName: "Здравствуйте",
  },
  {
    path: "music/artisti.mp3",
    displayName: "Бродячие артисты",
  },
  {
    path: "music/tayga.mp3",
    displayName: "Тайга",
  },
  {
    path: "music/krpedali.mp3",
    displayName: "Кручу педали",
  },
  {
    path: "music/planeta.mp3",
    displayName: "Планета эта",
  },
  {
    path: "music/dvizenie.mp3",
    displayName: "Вечное движение",
  },
  {
    path: "music/sgorodom.mp3",
    displayName: "Одесса",
  },
  {
    path: "music/kakten.mp3",
    displayName: "Как тень",
  },
  {
    path: "music/snkino.mp3",
    displayName: "Снимается кино",
  },
  {
    path: "music/volshebniki.mp3",
    displayName: "Волшебники",
  },
  {
    path: "music/malinovka.mp3",
    displayName: "Малиновка",
  },
  {
    path: "music/vivaldi.mp3",
    displayName: "Под музыку Вивальди",
  },
  {
    path: "music/vestango.mp3",
    displayName: "Весеннее танго",
  },
  {
    path: "music/amazonka.mp3",
    displayName: "На далёкой Амазонке",
  },
  {
    path: "music/gruzinp.mp3",
    displayName: "Грузинская песня",
  },
  {
    path: "music/vechvesna.mp3",
    displayName: "Вечная весна",
  },
];
const music = new Audio();
let musicIndex = 0;
let isPlaying = false;
//================== Play Song  True or False====================
function togglePlay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}
//================== Play Music====================
function playMusic() {
  isPlaying = true;
  playvBtnEl.classList.replace("fa-play", "fa-pause");
  playvBtnEl.setAttribute("title", "pause");
  music.play();
}
//================== Pause Music====================
function pauseMusic() {
  isPlaying = false;
  playvBtnEl.classList.replace("fa-pause", "fa-play");
  playvBtnEl.setAttribute("pause", "title");
  music.pause();
}
//================== Load Songs ====================
function loadMusic(songs) {
  music.src = songs.path;
  musicTitleEl.textContent = songs.displayName;
}
//================== Change Music ====================
function changeMusic(direction) {
  musicIndex = musicIndex + direction + (songs.length % songs.length);
  loadMusic(songs[musicIndex]);
  playMusic();
}
//================== Set Progress ====================
function setProgressBar(e) {
  const width = playerProgressEl.clientWidth;
  const xValue = e.offsetX;
  music.currentTime = (xValue / width) * music.duration;
}
//================== Set Progress ====================
function updateProgressBar() {
  const { duration, currentTime } = music;
  const ProgressPercent = (currentTime / duration) * 100;
  progressEl.style.width = `${ProgressPercent}%`;
  const formattime = (timeRanges) =>
    String(Math.floor(timeRanges)).padStart(2, "0");
  durationEl.textContent = `${formattime(duration / 60)} : ${formattime(
    duration % 60,
  )}`;
  currentTimeEl.textContent = `${formattime(currentTime / 60)} : ${formattime(
    currentTime % 60,
  )}`;
}
//================= Btn Events========================
const btnEvents = () => {
  playvBtnEl.addEventListener("click", togglePlay);
  nextvBtnEl.addEventListener("click", () => changeMusic(1));
  prevBtnEl.addEventListener("click", () => changeMusic(-1));
  //========= Progressbar===========================
  music.addEventListener("ended", () => changeMusic(1));
  music.addEventListener("timeupdate", updateProgressBar);
  playerProgressEl.addEventListener("click", setProgressBar);
};
//================= Btn Events========================
document.addEventListener("DOMContentLoaded", btnEvents);
//============ Calling Load Music
loadMusic(songs[musicIndex]);

