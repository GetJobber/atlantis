import React from "react";

export default function Card(props) {
  return (
    <svg width="3.64em" viewBox="0 0 51 32" {...props}>
      <g fill="none" fillRule="evenodd">
        <rect width={51} height={32} fill="#FFF" fillRule="nonzero" rx={5} />
        <rect width={50} height={31} x={0.5} y={0.5} stroke="#E0E0E0" rx={4} />
        <rect
          width={10}
          height={6}
          x={4}
          y={7}
          fill="#9D9D9D"
          fillRule="nonzero"
          rx={3}
        />
        <rect
          width={9}
          height={2}
          x={4}
          y={19}
          fill="#E0E0E0"
          fillRule="nonzero"
          rx={1}
        />
        <rect
          width={16}
          height={2}
          x={4}
          y={24}
          fill="#E0E0E0"
          fillRule="nonzero"
          rx={1}
        />
        <rect
          width={9}
          height={2}
          x={15}
          y={19}
          fill="#E0E0E0"
          fillRule="nonzero"
          rx={1}
        />
        <rect
          width={5}
          height={2}
          x={22}
          y={24}
          fill="#E0E0E0"
          fillRule="nonzero"
          rx={1}
        />
        <rect
          width={9}
          height={2}
          x={26}
          y={19}
          fill="#E0E0E0"
          fillRule="nonzero"
          rx={1}
        />
        <rect
          width={9}
          height={2}
          x={37}
          y={19}
          fill="#E0E0E0"
          fillRule="nonzero"
          rx={1}
        />
      </g>
    </svg>
  );
}
