import React from "react";

const Tooth = ({
  position,
  rotation,
  color,
  id,
  type,
  onHover,
  onUnhover,
  onClick,
  isUpper,
}) => {
  let geometry = null;
  let meshRotation = [...rotation];

  switch (type) {
    case "Incisor":
      geometry = <boxGeometry args={[0.32, 1.0, 0.32]} />;
      break;
    case "Canine":
      geometry = <coneGeometry args={[0.22, 1.1, 16]} />;
      if (isUpper) {
        meshRotation[0] += Math.PI;
      }
      break;
    case "Premolar":
      geometry = <cylinderGeometry args={[0.32, 0.38, 0.8, 16]} />;
      break;
    case "Molar":
      geometry = <cylinderGeometry args={[0.45, 0.55, 0.7, 16]} />;
      break;
    default:
      geometry = <boxGeometry args={[0.32, 0.8, 0.32]} />;
  }

  return (
    <mesh
      position={position}
      rotation={meshRotation}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(id, type, e);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        onUnhover();
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(id, type, e);
      }}
      castShadow
      receiveShadow
    >
      {geometry}
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Tooth;
