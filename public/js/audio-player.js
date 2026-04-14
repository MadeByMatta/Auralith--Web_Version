document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio-element');
    const globalPlayer = document.getElementById('global-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const progressBar = document.getElementById('progress-bar');
    const progressFill = document.getElementById('progress-fill');
    const currentTimeEl = document.getElementById('current-time');
    const totalTimeEl = document.getElementById('total-time');
    const volumeBar = document.getElementById('volume-bar');
    const volumeFill = document.getElementById('volume-fill');
    const muteBtn = document.getElementById('mute-btn');
    const playerCover = document.getElementById('player-cover');
    const playerTitle = document.getElementById('player-title');
    const playerArtist = document.getElementById('player-artist');

    let isPlaying = false;
    let currentTrackUrl = null;

    // Helper to format time
    const formatTime = (time) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    // Play/Pause toggle
    const togglePlay = () => {
        if (!currentTrackUrl) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play().catch(e => console.error("Error playing audio:", e));
        }
    };

    // Update play/pause UI
    audio.addEventListener('play', () => {
        isPlaying = true;
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    });

    audio.addEventListener('pause', () => {
        isPlaying = false;
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    });

    audio.addEventListener('ended', () => {
        isPlaying = false;
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        progressFill.style.width = '0%';
        currentTimeEl.textContent = '0:00';
    });

    // Handle time update for progress bar
    audio.addEventListener('timeupdate', () => {
        if (!audio.duration) return;
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = `${progressPercent}%`;
        currentTimeEl.textContent = formatTime(audio.currentTime);
    });

    // Handle loaded metadata for total time
    audio.addEventListener('loadedmetadata', () => {
        totalTimeEl.textContent = formatTime(audio.duration);
    });

    // Seek functionality
    progressBar.addEventListener('click', (e) => {
        if (!audio.duration) return;
        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const percentage = clickX / width;
        audio.currentTime = percentage * audio.duration;
    });

    // Volume functionality
    let currentVolume = 0.5;
    audio.volume = currentVolume;
    volumeFill.style.width = `${currentVolume * 100}%`;

    volumeBar.addEventListener('click', (e) => {
        const rect = volumeBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        let percentage = clickX / width;
        percentage = Math.max(0, Math.min(1, percentage));
        audio.volume = percentage;
        volumeFill.style.width = `${percentage * 100}%`;
        currentVolume = percentage;
        audio.muted = false;
    });

    muteBtn.addEventListener('click', () => {
        audio.muted = !audio.muted;
        if (audio.muted) {
            volumeFill.style.width = '0%';
        } else {
            volumeFill.style.width = `${currentVolume * 100}%`;
        }
    });

    playPauseBtn.addEventListener('click', togglePlay);

    // Play a track explicitly
    window.playTrack = (url, title, artist, coverUrl) => {
        globalPlayer.style.display = 'flex';
        
        if (currentTrackUrl !== url) {
            audio.src = url;
            currentTrackUrl = url;
            playerTitle.textContent = title;
            playerArtist.textContent = artist;
            if (coverUrl) playerCover.src = coverUrl;
            
            // Allow time for audio to load before playing
            audio.play().catch(console.error);
        } else {
            togglePlay();
        }
    };

    // Add click listeners to track rows
    const documentTracks = document.querySelectorAll('.playable-track');
    documentTracks.forEach(trackRow => {
        trackRow.addEventListener('click', () => {
            const url = trackRow.dataset.audioUrl;
            const title = trackRow.dataset.title;
            const artist = trackRow.dataset.artist;
            const cover = trackRow.dataset.cover;
            
            if (url) {
                window.playTrack(url, title, artist, cover);
            }
        });
    });
});
