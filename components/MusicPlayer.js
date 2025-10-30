'use client';

import { useState, useRef } from 'react';
import { FaPlay, FaPause, FaSpotify, FaYoutube, FaSoundcloud } from 'react-icons/fa';
import SocialShare from './SocialShare';

export default function MusicPlayer({ track }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setPlaying(!playing);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const percent = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(percent || 0);
    }
  };

  const handleProgressClick = (e) => {
    if (audioRef.current) {
      const bounds = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const width = bounds.width;
      const percent = x / width;
      audioRef.current.currentTime = audioRef.current.duration * percent;
    }
  };

  const isExternalLink = track.audioUrl.includes('http');

  return (
    <div className="music-player fade-in">
      <div className="mb-4">
        {track.coverImage && (
          <img
            src={track.coverImage}
            alt={track.title}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}
        <h3 className="font-space text-xl mb-2 text-amber-400">{track.title}</h3>
        <p className="text-gray-400 text-sm mb-2">{track.artist}</p>
        {track.description && (
          <p className="text-gray-500 text-xs mb-4">{track.description}</p>
        )}
      </div>

      {!isExternalLink && (
        <div className="mb-4">
          <audio
            ref={audioRef}
            src={track.audioUrl}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setPlaying(false)}
          />
          <div className="flex items-center gap-4 mb-2">
            <button
              onClick={togglePlay}
              className="w-12 h-12 flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-black rounded-full transition-colors"
            >
              {playing ? <FaPause size={20} /> : <FaPlay size={20} className="ml-1" />}
            </button>
            <div
              className="flex-1 h-2 bg-gray-700 rounded-full cursor-pointer overflow-hidden"
              onClick={handleProgressClick}
            >
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* External Links */}
      {track.externalLinks && (
        <div className="flex gap-2 mb-4">
          {track.externalLinks.spotify && (
            <a
              href={track.externalLinks.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-xs rounded transition-colors"
            >
              <FaSpotify /> Spotify
            </a>
          )}
          {track.externalLinks.youtube && (
            <a
              href={track.externalLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-xs rounded transition-colors"
            >
              <FaYoutube /> YouTube
            </a>
          )}
          {track.externalLinks.soundcloud && (
            <a
              href={track.externalLinks.soundcloud}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs rounded transition-colors"
            >
              <FaSoundcloud /> SoundCloud
            </a>
          )}
        </div>
      )}

      <SocialShare
        url={typeof window !== 'undefined' ? window.location.href + '#music' : ''}
        title={`${track.title} - ${track.artist}`}
        size="small"
      />
    </div>
  );
}
