import React from 'react';
import { IconProps } from './icon.types';

const BlockQuotes = ({ width, height, fill }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 56 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M56 25.4647C56 32.3206 49.9251 37 43.4083 37C34.0197 37 29.4911 30.0353 29.4911 22.0912C29.4911 11.8618 37.1124 0 51.14 0V1.19706C40.6469 1.19706 34.0197 8.48824 34.0197 15.3441C34.0197 16.1059 34.0197 16.5412 34.3511 16.5412C35.2347 16.5412 37.6647 13.9294 43.1874 13.9294C50.146 13.9294 56 19.0441 56 25.4647ZM26.5089 25.4647C26.5089 32.3206 20.4339 37 13.9172 37C4.5286 37 0 30.0353 0 22.0912C0 11.8618 7.6213 0 21.6489 0V1.19706C11.1558 1.19706 4.5286 8.48824 4.5286 15.3441C4.5286 16.1059 4.5286 16.5412 4.85996 16.5412C5.74359 16.5412 8.17357 13.9294 13.6963 13.9294C20.1026 13.9294 26.5089 19.0441 26.5089 25.4647Z"
        fill={fill || '#39224E'}
      />
    </svg>
  );
};

export default BlockQuotes;
