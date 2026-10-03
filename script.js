// Stations linked directly to your audio files in the repository
const stations = [
    {
        name: "Our Memories",
        frequency: "107.9 FM",
        src: "audio/vn1.mp3"
    },
    {
        name: "Late Night Thoughts",
        frequency: "98.5 FM",
        src: "audio/vn2.mp3"
    }
];

let currentStationIndex = 0;
const audioPlayer = document.getElementById("audio-player");
const playBtn = document.getElementById("play-btn");
const stationName = document.getElementById("station-name");
const stationFrequency = document.getElementById("station-frequency");
const vinyl = document.getElementById("vinyl");
const stationButtons = document.querySelectorAll(".station-select-btn");

function loadStation(index) {
    currentStationIndex = index;
    const station = stations[index];
    
    audioPlayer.src = station.src;
    stationName.textContent = station.name;
    stationFrequency.textContent = station.frequency;

    // Update active button styling
    stationButtons.forEach((btn, idx) => {
        if (idx === index) {
            btn.classList.add("active-station");
        } else {
            btn.classList.remove("active-station");
        }
    });
}

// Play / Pause Toggle
playBtn.addEventListener("click", () => {
    if (audioPlayer.paused) {
        audioPlayer.play().then(() => {
            playBtn.textContent = "⏸";
            vinyl.classList.add("spinning");
        }).catch(error => {
            alert("Audio file not found! Make sure your .mp3 file is uploaded to the 'audio/' folder.");
        });
    } else {
        audioPlayer.pause();
        playBtn.textContent = "▶";
        vinyl.classList.remove("spinning");
    }
});

// Next Station
document.getElementById("next-btn").addEventListener("click", () => {
    currentStationIndex = (currentStationIndex + 1) % stations.length;
    loadStation(currentStationIndex);
    audioPlayer.play().catch(() => {});
    playBtn.textContent = "⏸";
    vinyl.classList.add("spinning");
});

// Previous Station
document.getElementById("prev-btn").addEventListener("click", () => {
    currentStationIndex = (currentStationIndex - 1 + stations.length) % stations.length;
    loadStation(currentStationIndex);
    audioPlayer.play().catch(() => {});
    playBtn.textContent = "⏸";
    vinyl.classList.add("spinning");
});

// Click station selector buttons
stationButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const index = parseInt(e.currentTarget.getAttribute("data-index"));
        loadStation(index);
        audioPlayer.play().catch(() => {});
        playBtn.textContent = "⏸";
        vinyl.classList.add("spinning");
    });
});

// Initialize first station on load
loadStation(0);
