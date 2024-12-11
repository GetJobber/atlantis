import { AnimatedPresence, Icon, Typography } from "@jobber/components";
import React, { useState } from "react";
import { Link } from "react-router-dom";

interface AnimatedPresenceDisclosureProps {
  readonly children: React.ReactNode;
  readonly title: React.ReactNode;
  readonly to: string;
}

function AnimatedPresenceDisclosure({
  children,
  title,
  to,
}: AnimatedPresenceDisclosureProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleHover = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsHovered(!isHovered);
  };

  return (
    <div>
      <Link
        to={to ?? "/"}
        href="https://www.google.com"
        tabIndex={0}
        onFocus={e => (e.currentTarget.style.boxShadow = "0 0 3px #0073e6")}
        onBlur={e => (e.currentTarget.style.boxShadow = "none")}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: isHovered
            ? "var(--color-surface)"
            : "var(--color-surface--background)",
          outline: "none",
          textDecoration: "none",
          minHeight: 40,
          paddingLeft: "var(--space-smallest)",
          transition: "all var(--timing-base) ease-out",
        }}
      >
        <Typography fontWeight="semiBold" size="large" textColor="heading">
          {title}
        </Typography>
        <button
          type="button"
          onClick={handleButtonClick}
          style={{
            backgroundColor: isHovered
              ? "var(--color-surface)"
              : "var(--color-surface--background)",
            border: "none",
            cursor: "pointer",
            transition: "all var(--timing-base) ease-out",
          }}
          aria-label="Toggle Changelog"
        >
          <Icon name="arrowDown" />
        </button>
      </Link>

      <AnimatedPresence>
        {isOpen && (
          <ul style={{ padding: "0" }}>
            {React.Children.map(children, child => (
              <>{child}</>
            ))}
          </ul>
        )}
      </AnimatedPresence>
    </div>
  );
}

// export default TritonExample;
export default AnimatedPresenceDisclosure;
