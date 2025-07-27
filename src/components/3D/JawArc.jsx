import React from "react";
import Tooth from "./Tooth";

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

const getFDIValueMap = (features) => {
  const map = {};
  if (!features) return map;
  features.forEach((f) => {
    map[f.name] = f.value;
  });
  return map;
};

const JawArc = ({
  y,
  z,
  isUpper,
  features,
  onToothHover,
  onToothUnhover,
  onToothClick,
}) => {
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
};

export default JawArc;
