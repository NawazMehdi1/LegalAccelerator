import React from 'react';
import { YoutubeProps } from './youtube.type';

const YoutubeIntegration = ({ className, VideoIdVal, title }: YoutubeProps) => {
  return (
    <iframe
      id="ytplayer"
      width="100%"
      allowFullScreen
      height="auto"
      title={title}
      className={className || 'w-full aspect-video'}
      src={`https://www.youtube.com/embed/${VideoIdVal}?autoplay=0&controls=1&rel=0`}
    ></iframe>
  );
};

export default YoutubeIntegration;
