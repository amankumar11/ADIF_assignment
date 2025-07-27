import React from "react";
import JawArc from "./JawArc";

const JawScene = ({ onToothHover, onToothUnhover, onToothClick, features }) => {
  return (
    <>
      {/* Upper gums */}
      {/* Upper jaw (y=1.2, z=0) */}
      <JawArc
        y={1.2}
        z={0}
        isUpper={true}
        onToothHover={onToothHover}
        onToothUnhover={onToothUnhover}
        onToothClick={onToothClick}
        features={features}
      />
      {/* Lower gums */}
      {/* Lower jaw (y=-1.2, z=0) */}
      <JawArc
        y={-1.2}
        z={0}
        isUpper={false}
        onToothHover={onToothHover}
        onToothUnhover={onToothUnhover}
        onToothClick={onToothClick}
        features={features}
      />
    </>
  );
};

export default JawScene;
