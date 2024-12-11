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

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Link
        to={to ?? "/"}
        href="https://www.google.com"
        tabIndex={0}
        onFocus={e => (e.currentTarget.style.boxShadow = "0 0 3px #0073e6")}
        onBlur={e => (e.currentTarget.style.boxShadow = "none")}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "var(--color-surface--background)",
          outline: "none",
          textDecoration: "none",
          minHeight: 40,
        }}
      >
        <Typography fontWeight="semiBold" size="large" textColor="heading">
          {title}
        </Typography>
        <button
          type="button"
          onClick={handleButtonClick}
          style={{
            backgroundColor: "var(--color-surface--background)",
            border: "none",
            cursor: "pointer",
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
