import { size } from '@styles/breakpoints';

const gap = 9;
const mobile = 23.7;
const tablet = 32.8;
const desktop = 42;

export const groupListHeight = (sideBarHeight: number) => {
  let groupBoxHeight;

  if (window.innerWidth <= size.mobile) {
    // Mobile
    groupBoxHeight = sideBarHeight - 2 * (mobile + gap) - 80;
  } else if (window.innerWidth <= size.tablet) {
    // Tablet
    groupBoxHeight = sideBarHeight - 2 * (tablet + gap) - 96;
  } else {
    // Desktop
    groupBoxHeight = sideBarHeight - 2 * (desktop + gap) - 104;
  }

  return groupBoxHeight;
};

export const groupListSkeletonLength = (sideBarHeight: number) => {
  let groupBoxLength;

  if (window.innerWidth <= size.mobile) {
    // Mobile
    groupBoxLength = Math.floor(sideBarHeight / (mobile + gap) - 4);
  } else if (window.innerWidth <= size.tablet) {
    // Tablet
    groupBoxLength = Math.floor(sideBarHeight / (tablet + gap) - 4);
  } else {
    // Desktop
    groupBoxLength = Math.floor(sideBarHeight / (desktop + gap) - 4);
  }

  return groupBoxLength / 2;
};
