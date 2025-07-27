import React from "react";
import { useThree } from "@react-three/fiber";

const FrontCamera = () => {
  const { camera } = useThree();

  React.useEffect(() => {
    camera.position.set(0, 0, 8);
    camera.up.set(0, 1, 0);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [camera]);

  return null;
};

export default FrontCamera;
