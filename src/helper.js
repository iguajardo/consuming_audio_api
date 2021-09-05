

export function handleMusic({ songs, current, setCurrent, playing, setPlaying, audio, repeat, shuffle }) {

    function selectPlay(idx) {
        if (current === idx && playing) {
            return;
        }
        audio.current.src = `https://assets.breatheco.de/apis/sound/${songs[idx].url}`;
        audio.current.play();
        setCurrent(idx);
        setPlaying(true);
    }

    function nextSong(e = null) {
        if (repeat && e === null) return;
        else if (shuffle) {
            shuffleSong();
        }
        else if (current === songs.length - 1) {
            audio.current.src = `https://assets.breatheco.de/apis/sound/${songs[0].url}`;
            audio.current.play();
            setPlaying(true);
            setCurrent(0);
        } else {
            audio.current.src = `https://assets.breatheco.de/apis/sound/${songs[current + 1].url}`;
            audio.current.play();
            setPlaying(true);
            setCurrent(current + 1);
        }
    }
    
    function prevSong() {
        if (shuffle) {
            shuffleSong();
        }
        else if (current === 0) {
            audio.current.src = `https://assets.breatheco.de/apis/sound/${songs[songs.length - 1].url}`;
            audio.current.play();
            setPlaying(true);
            setCurrent(songs.length - 1);
        } else {
            audio.current.src = `https://assets.breatheco.de/apis/sound/${songs[current - 1].url}`;
            audio.current.play();
            setPlaying(true);
            setCurrent(current - 1);
        }
    }

    function togglePlayPause() {
        if (songs !== null) {
            setPlaying(!playing);
            playing ? audio.current.pause() : audio.current.play();
        }
    }

    function shuffleSong() {
        let randomValue = Math.floor(Math.random() * songs.length);
        audio.current.src = `https://assets.breatheco.de/apis/sound/${songs[randomValue].url}`;
        audio.current.play();
        setCurrent(randomValue);
    }

    return { selectPlay, nextSong, prevSong, togglePlayPause }
}