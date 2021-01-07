import * as React from 'react';

// Icon SVGs taken from https://materialdesignicons.com/

export const ChevronDown = (props: React.SVGProps<SVGSVGElement>) => (
  <svg style={{ width: 24, height: 24 }} {...props} viewBox="0 0 24 24">
    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
  </svg>
);

export const ChevronLeft = (props: React.SVGProps<SVGSVGElement>) => (
  <svg style={{ width: 24, height: 24 }} {...props} viewBox="0 0 24 24">
    <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
  </svg>
);

export const ChevronRight = (props: React.SVGProps<SVGSVGElement>) => (
  <svg style={{ width: 24, height: 24 }} {...props} viewBox="0 0 24 24">
    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
  </svg>
);

export const DotsHorizontal = (props: React.SVGProps<SVGSVGElement>) => (
  <svg style={{ width: 24, height: 24 }} {...props} viewBox="0 0 24 24">
    <path d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z" />
  </svg>
);

export const Router = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 512 512">
    <path d="M256,0C113.9,0,0,113.9,0,256s113.9,256,256,256c141,0,256-113.9,256-256S397,0,256,0z M256,92.5l86.8,86.8l-30.4,30.4  L256,152.2l-57.5,57.5l-29.3-30.4L256,92.5z M90.2,315.8l56.4-57.5l-56.4-59.8l29.3-29.3l86.8,86.8l-86.8,86.8L90.2,315.8z   M256,419.5l-86.8-86.8l29.3-30.4l57.5,57.5l56.4-57.5l30.4,30.4L256,419.5z M424,315.8l-29.3,30.4l-86.8-88l86.8-86.8l29.3,27.1  L367.6,256L424,315.8z" />
  </svg>
);
