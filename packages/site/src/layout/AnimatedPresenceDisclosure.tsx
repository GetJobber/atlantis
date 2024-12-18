import { AnimatedPresence, Button, Typography } from "@jobber/components";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./NavMenu.module.css";

interface AnimatedPresenceDisclosureProps {
  readonly children: React.ReactNode;
  readonly title: React.ReactNode;
  readonly to: string;
  // readonly className?: string;
  readonly selected?: boolean;
}

function AnimatedPresenceDisclosure({
  children,
  title,
  to,
  // className,
  selected,
}: AnimatedPresenceDisclosureProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <span
        className={`${styles.disclosureNavItem} ${
          selected ? styles.selected : ""
        }`}
      >
        {" "}
        <Link to={to ?? "/"} tabIndex={0}>
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

export default AnimatedPresenceDisclosure;
