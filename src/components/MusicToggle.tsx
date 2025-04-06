import '../style/style.css';
import { useState, useRef } from 'react';

export default function MusicToggle() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const toggleMusic = () => {
        setIsPlaying((prev) => {
            const newState = !prev;
            if (audioRef.current) {
                if (newState) {
                    audioRef.current.play();
                } else {
                    audioRef.current.pause();
                }
            }
            return newState;
        });
    };

    return (
        <div className="musicToggle navItem">
            <button className="toggleButton" onClick={toggleMusic}>
                <div className={`toggleSwitch ${isPlaying ? 'on' : 'off'}`}>
                    <div className={`switch ${isPlaying ? 'on' : 'off'}`}></div>
                </div>
                <audio className="background-music" ref={audioRef}>
                    <source src="/assets/coltraneProject.mp3" type="audio/mpeg" />
                </audio>
                <img
                    id="musicImg"
                    src={`/assets/${isPlaying ? 'pauseButton.png' : 'playButton.png'}`}
                    alt={isPlaying ? 'Pause Button for Music' : 'Play Button for Music'}
                />
            </button>
        </div>
    );
}