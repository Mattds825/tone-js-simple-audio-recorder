// Select Elements
const recordBtn = document.getElementById('record-btn');
const recordModal = document.getElementById('record-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const doneRecordingBtn = document.getElementById('done-recording-btn');
const stopRecordingBtn = document.getElementById('stop-recording-btn');


recordBtn.addEventListener('click', () => {
    recordModal.classList.toggle('hidden');
});

closeModalBtn.addEventListener('click', () => {
    recordModal.classList.toggle('hidden');
});

doneRecordingBtn.addEventListener('click', () => {
    recordModal.classList.toggle('hidden');
});