import React from "react";

export const Icon = ({ src, alt, height, width }) => {
  console.log(src);
  return <img src={src} alt={alt} height={height} width={width}></img>;
};

export default Icon;
