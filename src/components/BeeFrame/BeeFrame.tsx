/**
 * This component format is not finalized
 */

import React, { Component, CSSProperties, ReactNode } from "react";

// Move this to CSS Modules.
// https://github.com/css-modules/css-modules
const style: CSSProperties = {
  border: "dashed 4px #EDDD45",
  textAlign: "center",
};

interface BeeFrameProps {
  label: string;
}

/**
 * BeeFrame React Component
 */
export class BeeFrame extends Component<BeeFrameProps> {
  public render(): ReactNode {
    return (
      <div style={style}>
        <h1>🐝</h1>
        <p>{this.props.label}</p>
      </div>
    );
  }
}
