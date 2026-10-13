"use client";

import { useRef, useState } from "react";

export default function SecondFamilyVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const seekingRef = useRef(false);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);

  function play() {
    const video = videoRef.current;
    if (!video) return;
    setStarted(true);
    const pending = video.play();
    if (pending) void pending.catch(() => setPlaying(false));
  }

  return (
    <div className="relative mx-auto aspect-[9/16] w-full max-w-[300px] sm:max-w-[320px]">
      <video
        ref={videoRef}
        className="size-full rounded-[4px] bg-(--nc-stone)"
        controls={started}
        playsInline
        preload="metadata"
        poster="/second-family-video-v4-poster.jpg"
        width={720}
        height={1280}
        aria-label="סרטון: גם כשאתם לא שם, תמיד יש מי שידאג"
        onPlay={() => {
          setStarted(true);
          setPlaying(true);
        }}
        onPause={() => {
          if (!seekingRef.current) setPlaying(false);
        }}
        onSeeking={() => {
          seekingRef.current = true;
        }}
        onSeeked={() => {
          seekingRef.current = false;
          setPlaying(videoRef.current ? !videoRef.current.paused : false);
        }}
      >
        <source src="/second-family-video-v4.mp4" type="video/mp4" />
      </video>
      {playing ? null : (
        <>
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={play}
            className={`absolute inset-x-0 top-0 cursor-pointer border-0 bg-transparent p-0 ${started ? "bottom-14" : "bottom-0"}`}
          />
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <button
              type="button"
              onClick={play}
              aria-label="הפעל את הסרטון"
              className="pointer-events-auto grid size-[68px] place-items-center rounded-full bg-[#0B1F3A]/80 text-white shadow-[0_8px_24px_rgba(11,31,58,0.4)] transition duration-150 hover:scale-105 hover:bg-[#0B1F3A] focus-visible:scale-105 focus-visible:bg-[#0B1F3A] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-white lg:size-[84px]"
            >
              <svg viewBox="0 0 24 24" className="size-7 translate-x-px lg:size-8" aria-hidden="true">
                <path fill="currentColor" d="M8.8 5.6v12.8L18.6 12 8.8 5.6Z" />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
