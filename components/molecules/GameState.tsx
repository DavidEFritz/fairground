import { atom } from "recoil";

export const shipPositionState = atom({
    key: "shipPosition", // unique ID (with respect to other atoms/selectors)
    default: { position: {}, rotation: {} }, // default value (aka initial value)
  });

  export const laserPositionState = atom({
    key: "laserPositions", // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
  });