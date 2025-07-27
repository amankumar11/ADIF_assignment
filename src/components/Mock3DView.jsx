import React, { useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ToothModal from "./ToothModal";
import JawScene from "./3D/JawScene";
import FrontCamera from "./3D/FrontCamera";
import Tooltip from "./3D/Tooltip";
import Legend from "./3D/Legend";

const getHighlightedTeeth = (features) => {
  if (!features) return [];
  return features.map((f) => f.name);
};

const getToothValue = (features, id) => {
  if (!features) return undefined;
  const found = features.find((f) => f.name === id);
  return found ? found.value : undefined;
};

const Mock3DView = ({ features }) => {
  const highlightedTeeth = useMemo(
    () => getHighlightedTeeth(features),
    [features]
  );
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    text: "",
  });
  const [modal, setModal] = useState({ open: false, toothInfo: {} });
  const containerRef = useRef();

  const handleToothHover = (id, type, e) => {
    setTooltip({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      text: `${id}: ${type}`,
    });
  };

  const handleToothUnhover = () =>
    setTooltip((t) => ({ ...t, visible: false }));

  const handleToothClick = (id, type, e) => {
    const value = getToothValue(features, id);
    setModal({ open: true, toothInfo: { id, type, value } });
  };

  const handleModalClose = () => setModal({ open: false, toothInfo: {} });

  return (
    <div
      className="mock-3d-container glassy-panel"
      ref={containerRef}
      style={{ position: "relative", overflow: "hidden" }}
    >
      <h2 style={{ position: "relative", zIndex: 1 }}>Mock 3D human mouth</h2>
      <Canvas
        style={{
          height: 500,
          background: "#222",
          borderRadius: 16,
          position: "relative",
          zIndex: 1,
        }}
        camera={{ fov: 50 }}
      >
        <FrontCamera />
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 20, 5]} intensity={0.7} />
        <JawScene
          features={features}
          onToothHover={handleToothHover}
          onToothUnhover={handleToothUnhover}
          onToothClick={handleToothClick}
        />
        <OrbitControls
          enablePan={true}
          enableRotate={true}
          enableZoom={true}
          minDistance={3}
          maxDistance={20}
        />
      </Canvas>
      <Tooltip {...tooltip} />
      <ToothModal
        open={modal.open}
        onClose={handleModalClose}
        toothInfo={modal.toothInfo}
      />
      <Legend />
      <div
        style={{ color: "#fff", marginTop: 8, position: "relative", zIndex: 1 }}
      >
        <small>
          Red: Cavity, Green: Cavity-free. Hover or click a tooth for more info.
        </small>
      </div>
    </div>
  );
};

export default Mock3DView;
