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
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    let isPlaying = false;
    let currentTrackUrl = null;
    let currentPlaylist = [];
    let currentIndex = -1;

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
        playNextTrack(); // Auto play next track
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

    // Play Next Track
    const playNextTrack = () => {
        if (currentPlaylist.length === 0 || currentIndex === -1) return;
        let nextIndex = currentIndex + 1;
        if (nextIndex >= currentPlaylist.length) {
            nextIndex = 0; // loop to beginning
        }
        playTrackFromIndex(nextIndex);
    };

    // Play Previous Track
    const playPrevTrack = () => {
        if (currentPlaylist.length === 0 || currentIndex === -1) return;
        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) {
            prevIndex = currentPlaylist.length - 1; // loop to end
        }
        playTrackFromIndex(prevIndex);
    };

    const playTrackFromIndex = (index) => {
        if (index < 0 || index >= currentPlaylist.length) return;
        currentIndex = index;
        const track = currentPlaylist[index];
        window.playTrack(track.url, track.title, track.artist, track.cover);
    };

    if (prevBtn) prevBtn.addEventListener('click', playPrevTrack);
    if (nextBtn) nextBtn.addEventListener('click', playNextTrack);

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

    // Add click listeners using event delegation
    document.addEventListener('click', (e) => {
        const trackRow = e.target.closest('.playable-track');
        if (trackRow) {
            // Update playlist array with current tracks on screen
            const trackElements = document.querySelectorAll('.playable-track');
            currentPlaylist = Array.from(trackElements).map(el => ({
                url: el.dataset.audioUrl,
                title: el.dataset.title,
                artist: el.dataset.artist,
                cover: el.dataset.cover
            }));
            
            const url = trackRow.dataset.audioUrl;
            currentIndex = currentPlaylist.findIndex(t => t.url === url);
            
            if (url) {
                window.playTrack(url, trackRow.dataset.title, trackRow.dataset.artist, trackRow.dataset.cover);
            }
        }
    });

    // SPA soft navigation to avoid full page reloads and keep audio playing
    document.addEventListener('click', async (e) => {
        const link = e.target.closest('a');
        if (!link) return;
        
        const href = link.getAttribute('href');
        // Ignore external links, anchors, or strictly auth-related routes
        if (!href || href.startsWith('http') || href.startsWith('//') || href.startsWith('#')) return;
        if (href.startsWith('/login') || href.startsWith('/logout') || href.startsWith('/register')) return;
        
        // Only trigger SPA navigation for known areas: player home, albums, profile and root
        if (href === '/player' || href.startsWith('/album/') || href === '/profile' || href === '/') {
            e.preventDefault();
            
            try {
                const response = await fetch(href);
                if (!response.ok) throw new Error('Network response not ok');
                const html = await response.text();
                
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                
                const newMain = doc.querySelector('main');
                const currentMain = document.querySelector('main');
                
                if (newMain && currentMain) {
                    currentMain.innerHTML = newMain.innerHTML;
                    
                    // Execute injected scripts
                    const scripts = currentMain.querySelectorAll('script');
                    scripts.forEach(oldScript => {
                        const newScript = document.createElement('script');
                        Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
                        newScript.appendChild(document.createTextNode(oldScript.textContent));
                        oldScript.parentNode.replaceChild(newScript, oldScript);
                    });
                    
                    document.title = doc.title;
                    window.history.pushState(null, '', href);
                    window.scrollTo(0, 0);
                } else {
                    window.location.href = href;
                }
            } catch (err) {
                console.error('SPA Navigation error:', err);
                window.location.href = href;
            }
        }
    });

    window.addEventListener('popstate', async () => {
        try {
            const response = await fetch(window.location.href);
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            const newMain = doc.querySelector('main');
            const currentMain = document.querySelector('main');
            
            if (newMain && currentMain) {
                currentMain.innerHTML = newMain.innerHTML;
                
                // Execute injected scripts
                const scripts = currentMain.querySelectorAll('script');
                scripts.forEach(oldScript => {
                    const newScript = document.createElement('script');
                    Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
                    newScript.appendChild(document.createTextNode(oldScript.textContent));
                    oldScript.parentNode.replaceChild(newScript, oldScript);
                });
                
                document.title = doc.title;
            } else {
                window.location.reload();
            }
        } catch (err) {
            window.location.reload();
        }
    });
});
