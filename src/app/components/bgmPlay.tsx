"use client"
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

const BgmPlayer: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      !isMuted ? audioRef.current.pause() : audioRef.current.play();
    }
  }, [isMuted]);

  return (
    <div>
      <audio
        ref={audioRef}
        src="https://utfs.io/f/lR4Tr45NRivG4Od7sWYbzlPRuK1oCWB5Nar2f9hGAQY7xVMH"
        loop
        autoPlay
      />
      <Button 
        className='absolute right-3 top-5 bg-transparent z-50'
        onClick={() => setIsMuted(!isMuted)}>
        {isMuted ? <Volume2 /> : <VolumeX /> }
      </Button>
    </div>
  );
};

export default BgmPlayer;