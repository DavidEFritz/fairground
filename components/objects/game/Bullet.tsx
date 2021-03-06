import { useSphere } from "@react-three/cannon";
import React from "react";

export const Bullet = (props) => {
  /** Bullet collider */
  const [sphereRef] = useSphere(() => ({
    mass: 10,
    args: [1],
    ...props
  }));

  return (
    <mesh ref={sphereRef} castShadow>
      <sphereBufferGeometry args={[1, 32, 32]} />
      <meshLambertMaterial color="hotpink" />
    </mesh>
  );
};