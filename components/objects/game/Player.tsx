// @ts-nocheck

import { useSphere } from "@react-three/cannon";
import React, { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { useMouseInput } from "./useMouseInput";
import { useKeyboardInput } from "./useKeyboardInput";
import { useVariable } from "./useVariable";
import { Bullet } from "./Bullet";
import { Raycaster } from "three";

/** Player movement constants */
const bulletSpeed = 40;
const bulletCoolDown = 300;

export const Player = () => {

  /** Bullets */
  const [bullets, setBullets] = useState([]);

  /** Input hooks */
  const pressed = useKeyboardInput(["w", "a", "s", "d", " "]);
  const pressedMouse = useMouseInput();

  /** Converts the input state to ref so they can be used inside useFrame */
  const input = useVariable(pressed);
  const mouseInput = useVariable(pressedMouse);

  /** Player movement constants */
  const { camera, scene } = useThree();

  /** Player state */
  const state = useRef({
    timeToShoot: 0,
  });

  /** Player loop */
  useFrame((_, delta) => {
    let cameraDirection = new Vector3();
    camera.getWorldDirection(cameraDirection);

    const space = input.current[" "];

    /** Handles shooting */
    const bulletDirection = cameraDirection.clone().multiplyScalar(bulletSpeed);
    const bulletPosition = camera.position
      .clone()
      .add(cameraDirection.clone().multiplyScalar(2));

    if (space) {
      const now = Date.now();
      if (now >= state.current.timeToShoot) {
        state.current.timeToShoot = now + bulletCoolDown;
        setBullets((bullets) => [
          ...bullets,
          {
            id: now,
            position: [bulletPosition.x, bulletPosition.y, bulletPosition.z],
            forward: [bulletDirection.x, bulletDirection.y, bulletDirection.z]
          }
        ]);
      }
    }
  });

  return (
    <>
      {/** Renders bullets */}
      {bullets.map((bullet) => {
        return (
          <Bullet
            key={bullet.id}
            velocity={bullet.forward}
            position={bullet.position}
          />
        );
      })}
    </>
  );
};