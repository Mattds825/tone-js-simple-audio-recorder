// Ensure Tone.js is loaded correctly
if (!window.Tone) {
  console.error("Tone.js not loaded");
}

// Global variables
let recorder, player, recordedAudioBuffer;

let audioChunks = [];
let audioBuffer;

const synth = new Tone.Synth().toDestination();

// Select Elements
const recordBtn = document.getElementById("record-btn");
const recordModal = document.getElementById("record-modal");
const closeModalBtn = document.getElementById("close-modal-btn");
const doneRecordingBtn = document.getElementById("done-recording-btn");
const stopRecordingBtn = document.getElementById("stop-recording-btn");
const playRecordingBtn = document.getElementById("play-recording-btn");
const recentRecordings = document.getElementById("recent-recordings");
const startContextBtn = document.getElementById("start-context-btn");

let recentRecordingsList = [];

let hasDoneRecording = false;

// Initialize Tone.js objects
const mic = new Tone.UserMedia();
const analyzer = new Tone.Waveform();
mic.connect(analyzer);

// Ask for microphone access when the page loads
// window.addEventListener("load", async () => {
//   mic.open().then(() => {
//       console.log('Microphone access granted.');
//   }).catch(err => {
//       console.error('Microphone access denied:', err);
//   });
// });

startContextBtn.addEventListener("click", async () => {
  await Tone.start();

  mic.open().then(() => {
      console.log("Microphone access granted.");
    })
    .catch((err) => {
      console.error("Microphone access denied:", err);
    });

  console.log("Audio context started");
  startContextBtn.classList.add("hidden");
  recordBtn.classList.remove("hidden");
});

// Strart recording
recordBtn.addEventListener("click", async () => {
  recordModal.classList.toggle("hidden");
  //   const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  //   const audioContext = new Tone.context.constructor();
  //   const input = audioContext.createMediaStreamSource(stream);
  //   recorder = new Tone.Recorder();

  //   input.connect(recorder);
  //   recorder.start();

  console.log("Recording started...");
  mic
    .open()
    .then(() => {
      recorder = new Tone.Recorder();
      mic.connect(recorder);
      //   recorder.connect(mic.output);
      recorder.start();
    })
    .catch((err) => console.error("Failed to open mic:", err));
});

// Stop recording and play the recorded audio
stopRecordingBtn.addEventListener("click", async () => {
  if (recorder) {
    const recording = await recorder.stop();
    audioChunks = await recording.arrayBuffer();
    audioBuffer = await Tone.getContext().decodeAudioData(audioChunks);

    recentRecordingsList.push(recording);

    const url = URL.createObjectURL(recording);
    const anchor = document.createElement("a");
    anchor.download = "recording.webm";
    anchor.href = url;
    // anchor.click();

    // recordButton.disabled = false;
    // stopButton.disabled = true;
    // playButton.disabled = false;

    console.log("Recording stopped...");

    console.log(audioBuffer);
  }

  // const recording = await recorder.stop();
  // // download the recording by creating an anchor element and blob url
  // const url = URL.createObjectURL(recording);
  // const anchor = document.createElement("a");
  // anchor.download = "recording.webm";
  // anchor.href = url;
  // anchor.click();

  // console.log(url);
  // console.log(recording);

  // recentRecordingsList.push(recording);
  // player.start();

  // if (stopRecordingBtn.textContent === 'Stop Recording') {
  //     recorder.stop().then((audioBuffer) => {
  //         // Use the audioBuffer directly to create a new player
  //         recordedAudioBuffer = audioBuffer;

  //         // Create a new player for the recorded audio
  //         player = new Tone.Player(recordedAudioBuffer).toDestination();

  //         stopRecordingBtn.textContent = 'Play'; // Change button text to Play

  //         // displayWaveform(recordedAudioBuffer);
  //     }).catch(err => {
  //         console.error('Error stopping the recorder:', err);
  //     });
  // } else if (stopRecordingBtn.textContent === 'Play') {
  //     if (player && player.buffer && player.buffer.length > 0) {
  //         player.start(); // Play the recorded audio
  //     } else {
  //         console.error('Player is not ready or buffer is empty.');
  //     }
  // }
});

playRecordingBtn.addEventListener("click", () => {
  //   synth.triggerAttackRelease("C4", "8n");
  console.log(audioBuffer);
  // player = new Tone.Player(recentRecordingsList[recentRecordingsList.length - 1]).toDestination();
  player = new Tone.Player(audioBuffer).toDestination();
  player.autostart = true;

  Tone.loaded().then(() => {
    player.start();
    console.log("Playing the recorded");
  });

  //   if (player && player.buffer && player.buffer.length > 0) {
  //     if (!player.loaded) {
  //         console.log("Playing the recorded audio autostart...");
  //     } else {
  //         player.autostart = true;
  //       player.start();
  //       console.log("Playing the recorded audio...");
  //     }

  //   } else {
  //     console.error("Player is not ready or buffer is empty.");
  //   }
});

closeModalBtn.addEventListener("click", () => {
  hasDoneRecording = false;
  recordModal.classList.toggle("hidden");
});

doneRecordingBtn.addEventListener("click", () => {
  hasDoneRecording = false;
  recordModal.classList.toggle("hidden");
  saveRecording();
});

function saveRecording() {
  // Logic to save recording (to server or local)
  const recordingItem = document.createElement("div");
  recordingItem.textContent = `Recording ${new Date().toLocaleString()}`;
  recentRecordings.appendChild(recordingItem);
}
