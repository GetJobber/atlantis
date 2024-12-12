import { AnimatedPresence, Button, Typography } from "@jobber/components";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./NavMenu.module.css";

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
      <span className={styles.disclosureNavItem}>
        <Link
          to={to ?? "/"}
          href="https://www.google.com"
          tabIndex={0}
          onFocus={e =>
            (e.currentTarget.style.boxShadow = "var(--shadow-focus)")
          }
          onBlur={e => (e.currentTarget.style.boxShadow = "none")}
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
          style={{
            backgroundColor: "transparent",
            outline: "none",
            textDecoration: "none",
          }}
        >
          <Typography fontWeight="semiBold" size="large" textColor="heading">
            {title}
          </Typography>
        </Link>
        <Button
          variation="subtle"
          size="small"
          type="tertiary"
          onClick={handleButtonClick}
          ariaLabel={`Toggle ${title}`}
          icon={isOpen ? "arrowUp" : "arrowDown"}
        />
      </span>

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
