import React from 'react';
import { IconProps } from './icon.types';

const MapIcon = ({ height, width, fill }: IconProps) => {
  return (
    <svg
      width={width || 25}
      height={height || 25}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_4798_10448)">
        <path
          d="M17.1997 10.7798C18.8945 10.7798 20.4305 11.4764 21.5434 12.5963C22.6562 13.7204 23.3419 15.2677 23.3419 16.9835C23.3419 18.235 22.9716 19.4042 22.3409 20.3783L25 23.3044L23.1649 24.9977L20.6014 22.1475C19.6269 22.803 18.457 23.1853 17.1997 23.1853C15.505 23.1853 13.9689 22.4886 12.856 21.3687C11.7432 20.2447 11.0575 18.6973 11.0575 16.9815C11.0575 15.2698 11.7472 13.7183 12.856 12.5943C13.9689 11.4702 15.5009 10.7798 17.1997 10.7798ZM15.4073 3.40678L22.6013 0.0511126C22.8862 -0.0804015 23.2178 0.0449479 23.3459 0.332635C23.3785 0.408666 23.4009 0.488808 23.4009 0.573059V11.686C23.0632 11.2791 22.4691 10.9072 22.0601 10.5743V1.67654L16.1967 4.61506V8.85433C15.8101 8.91393 14.9963 9.00023 14.6301 9.11325V4.61712L8.76465 2.00738V18.6788L9.50521 19.2624C9.71883 19.92 10.0118 20.7625 10.3739 21.3338L7.99764 19.8851L0.858561 24.2415C0.594076 24.4059 0.244141 24.3175 0.0874837 24.0504C0.0284831 23.9579 0 23.8552 0 23.7524V4.03352C0 3.78899 0.148519 3.58144 0.364176 3.5013L7.76164 0.0572773H7.77588L7.79012 0.0511126H7.79622C7.85116 0.0305635 7.90405 0.0182341 7.96509 0.0182341H8.03426C8.08919 0.0243988 8.15023 0.0326184 8.20312 0.0511126H8.20923L8.22347 0.0572773H8.23771L15.4317 3.41294L15.4073 3.40678ZM7.19808 18.6788V2.00738L1.2797 4.56163V22.3551L7.19808 18.6788ZM20.5912 13.558C19.7225 12.6826 18.5221 12.1381 17.1997 12.1381C15.8773 12.1381 14.6769 12.6826 13.8082 13.558C12.9415 14.4334 12.4023 15.6479 12.4023 16.9835C12.4023 18.3192 12.9415 19.5316 13.8082 20.4091C14.6749 21.2845 15.8752 21.829 17.1997 21.829C18.5221 21.829 19.7225 21.2845 20.5912 20.4091C21.4579 19.5337 21.9971 18.3213 21.9971 16.9835C21.9971 15.6479 21.4579 14.4355 20.5912 13.558Z"
          fill={fill || '#127BB9'}
        />
      </g>
      <defs>
        <clipPath id="clip0_4798_10448">
          <rect width="25" height="25" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default MapIcon;