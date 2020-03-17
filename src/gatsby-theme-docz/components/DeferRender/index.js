import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

export const DeferRender = ({ children }) => {
  const [ssrComplete, setSsrComplete] = useState(false);
  useEffect(() => {
    setSsrComplete(true);
  });

  if (ssrComplete) return children;
  return <React.Fragment></React.Fragment>;
};

DeferRender.propTypes = {
  children: PropTypes.node,
};
