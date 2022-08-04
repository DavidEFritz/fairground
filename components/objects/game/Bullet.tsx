import { useSphere } from "@react-three/cannon";
import React from "react";

export const Bullet = (props) => {
  /** Ball collider */
  const [sphereRef] = useSphere(() => ({
    mass: props.mass,
    args: [props.ballSize],
    ...props
  }));

  return (
    <mesh ref={sphereRef} castShadow>
      <sphereBufferGeometry args={[props.ballSize, 32, 32]} />
      <meshLambertMaterial color="red" />
    </mesh>
  );
};