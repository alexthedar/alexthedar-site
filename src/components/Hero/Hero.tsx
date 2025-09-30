import React, { useState, useRef, useEffect } from 'react';

const Hero: React.FC = () => {
  const [videoOpacity, setVideoOpacity] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (!video.duration) return;

      const currentTime = video.currentTime;

      // Start fading out at 14 seconds (3 seconds before end of ~17 second video)
      const fadeStartTime = 14;

      if (currentTime >= fadeStartTime) {
        // Calculate opacity based on remaining time (3 second fade)
        const fadeProgress = (currentTime - fadeStartTime) / 3;
        const opacity = Math.max(0, 1 - fadeProgress);
        setVideoOpacity(opacity);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-calm-light to-white">
      {/* Fallback tiled background pattern (always visible underneath) */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Video background with fade effect */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden transition-opacity duration-1000"
        style={{ opacity: videoOpacity }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="absolute min-w-full min-h-full w-auto h-auto max-w-none object-cover"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <source src={`${import.meta.env.BASE_URL}hero-video-new.mp4`} type="video/mp4" />
          {/* Fallback to tiled background if video doesn't load */}
        </video>

        {/* Overlay to darken video slightly */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="relative z-10 text-center px-6 animate-fade-in">
        {/* Add semi-transparent background to improve text readability */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 max-w-5xl mx-auto shadow-xl">
          {/* Name */}
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="text-calm-dark">Alexandar </span>
            <span className="text-gradient">Castaneda</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-calm-gray max-w-4xl mx-auto mb-8">
            Senior Engineer with 8+ years building systems that don't fall apart under pressure.
            <br />
            <span className="text-calm-dark font-medium">
              React • React Native • TypeScript • Node.js
            </span>
          </p>

          {/* CTAs */}
          <div className="flex gap-4 justify-center">
            <a
              href="#projects"
              className="px-6 py-3 bg-calm-dark text-white rounded-lg hover:bg-chaos-purple transition-colors duration-300"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border-2 border-calm-dark text-calm-dark rounded-lg hover:bg-calm-dark hover:text-white transition-colors duration-300"
            >
              Get in Touch
            </a>
          </div>

          {/* Location/Status */}
          <div className="mt-12 text-sm text-calm-gray">
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Available for remote opportunities • Portland, OR
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-calm-gray" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;