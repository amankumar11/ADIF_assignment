import React, { useMemo, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { FaTooth } from "react-icons/fa";

// Tooth type and order for one jaw (left to right):
const TOOTH_LAYOUT = [
  "molar",
  "molar",
  "molar", // 3 molars
  "premolar",
  "premolar", // 2 premolars
  "canine", // 1 canine
  "incisor",
  "incisor", // 2 lateral/central incisors (right)
  "incisor",
  "incisor", // 2 lateral/central incisors (left)
  "canine", // 1 canine
  "premolar",
  "premolar", // 2 premolars
  "molar",
  "molar",
  "molar", // 3 molars
];

const TOOTH_TYPE_MAP = {
  incisor: "Incisor",
  canine: "Canine",
  premolar: "Premolar",
  molar: "Molar",
};

const getToothType = (type) => TOOTH_TYPE_MAP[type] || "Unknown";

const getHighlightedTeeth = (features) => {
  if (!features) return [];
  return features.map((f) => f.name);
};

const getToothValue = (features, id) => {
  if (!features) return undefined;
  const found = features.find((f) => f.name === id);
  return found ? found.value : undefined;
};

const getFDIValueMap = (features) => {
  const map = {};
  if (!features) return map;
  features.forEach((f) => {
    map[f.name] = f.value;
  });
  return map;
};

function Tooth({
  position,
  rotation,
  color,
  id,
  type,
  onHover,
  onUnhover,
  onClick,
  isUpper,
}) {
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
}

function JawArc({
  y,
  z,
  isUpper,
  features,
  onToothHover,
  onToothUnhover,
  onToothClick,
}) {
  const a = 6.5;
  const b = 4.2;
  const teeth = [];
  const n = TOOTH_LAYOUT.length;
  const fdiMap = getFDIValueMap(features);
  for (let i = 0; i < n; i++) {
    const angle = Math.PI * (i / (n - 1)) - Math.PI / 2;
    const x = a * Math.sin(angle);
    const dz = b * Math.cos(angle);
    const pos = [x, y, z + dz];
    const rotY = Math.atan2(-x, -dz);
    let fdi;
    if (isUpper) {
      fdi =
        i < n / 2
          ? String(1) + String(8 - i)
          : String(2) + String(i - n / 2 + 1);
    } else {
      fdi =
        i < n / 2
          ? String(4) + String(8 - i)
          : String(3) + String(i - n / 2 + 1);
    }
    const type = getToothType(TOOTH_LAYOUT[i]);
    let color = "#fff";
    if (fdiMap[fdi] === 1) color = "#e53935";
    else if (fdiMap[fdi] === 0) color = "#43a047";
    teeth.push(
      <Tooth
        key={fdi}
        id={fdi}
        type={type}
        position={pos}
        rotation={[0, rotY, 0]}
        color={color}
        onHover={onToothHover}
        onUnhover={onToothUnhover}
        onClick={onToothClick}
        isUpper={isUpper}
      />
    );
  }
  return <>{teeth}</>;
}

function JawScene({
  highlightedTeeth,
  onToothHover,
  onToothUnhover,
  onToothClick,
  features,
}) {
  return (
    <>
      {/* Upper jaw (y=1.2, z=0) */}
      <JawArc
        y={1.2}
        z={0}
        isUpper={true}
        highlightedTeeth={highlightedTeeth}
        onToothHover={onToothHover}
        onToothUnhover={onToothUnhover}
        onToothClick={onToothClick}
        features={features}
      />
      {/* Lower jaw (y=-1.2, z=0) */}
      <JawArc
        y={-1.2}
        z={0}
        isUpper={false}
        highlightedTeeth={highlightedTeeth}
        onToothHover={onToothHover}
        onToothUnhover={onToothUnhover}
        onToothClick={onToothClick}
        features={features}
      />
    </>
  );
}

const Tooltip = ({ visible, x, y, text }) => {
  if (!visible) return null;
  return (
    <div
      style={{
        position: "fixed",
        left: x + 12,
        top: y + 12,
        background: "rgba(30,30,30,0.95)",
        color: "#fff",
        padding: "6px 12px",
        borderRadius: 6,
        pointerEvents: "none",
        zIndex: 1000,
        fontSize: 14,
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      }}
    >
      {text}
    </div>
  );
};

const Modal = ({ open, onClose, toothInfo }) => {
  if (!open) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.3)",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          color: "#222",
          borderRadius: 10,
          padding: 24,
          minWidth: 260,
          boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ marginTop: 0 }}>Tooth Info</h3>
        <div>
          <b>FDI Number:</b> {toothInfo.id}
        </div>
        <div>
          <b>Type:</b> {toothInfo.type}
        </div>
        {toothInfo.value !== undefined && (
          <div>
            <b>Value:</b> {toothInfo.value}
          </div>
        )}
        <button style={{ marginTop: 16 }} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

function FrontCamera() {
  const { camera } = useThree();
  React.useEffect(() => {
    camera.position.set(0, 0, 8); // Front view
    camera.up.set(0, 1, 0); // y+ is up
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [camera]);
  return null;
}

const Legend = () => (
  <div
    style={{
      display: "flex",
      gap: 24,
      marginTop: 18,
      alignItems: "center",
      background: "rgba(24,28,32,0.85)",
      borderRadius: 8,
      padding: "10px 18px",
      boxShadow: "0 2px 8px rgba(0,188,212,0.08)",
      border: "1.5px solid var(--accent2)",
      width: "fit-content",
    }}
  >
    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span
        style={{
          width: 18,
          height: 18,
          background: "#e53935",
          borderRadius: "50%",
          display: "inline-block",
          border: "2px solid #fff",
        }}
      ></span>
      <span style={{ color: "#fff" }}>Cavity</span>
    </span>
    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span
        style={{
          width: 18,
          height: 18,
          background: "#43a047",
          borderRadius: "50%",
          display: "inline-block",
          border: "2px solid #fff",
        }}
      ></span>
      <span style={{ color: "#fff" }}>Cavity-free</span>
    </span>
  </div>
);

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
      {/* Watermark */}
      {/* <FaTooth size={180} style={{
        position: 'absolute',
        right: 20,
        bottom: 10,
        color: 'rgba(0,188,212,0.07)',
        zIndex: 0,
        pointerEvents: 'none',
      }} /> */}
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
      <Modal
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
