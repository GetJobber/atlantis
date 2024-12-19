import { AnimatedPresence, Button, Typography } from "@jobber/components";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./NavMenu.module.css";

interface AnimatedPresenceDisclosureProps {
  readonly children: React.ReactNode;
  readonly title: React.ReactNode;
  readonly to: string;
  readonly selected?: boolean;
}

function AnimatedPresenceDisclosure({
  children,
  title,
  to,
  selected,
}: AnimatedPresenceDisclosureProps) {
  const location = useLocation();

  // Determine if any child is selected based on the current URL
  const hasSelectedChild = React.Children.toArray(children).some(
    child =>
      React.isValidElement(child) && location.pathname === child.props.to,
  );

  const [isOpen, setIsOpen] = useState(selected || hasSelectedChild);

  // Open the disclosure if the parent or any child is selected
  useEffect(() => {
    if (selected || hasSelectedChild) {
      setIsOpen(true);
    }
  }, [selected, hasSelectedChild]);

  // Scroll the selected element into view when the disclosure is open
  useEffect(() => {
    if (isOpen) {
      const selectedElement = document.querySelector(
        `[href="${location.pathname}"]`,
      );

      if (selectedElement) {
        selectedElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [isOpen, location.pathname]);

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const isTitleSelected = location.pathname === to;

  return (
    <div>
      <span
        className={`${styles.disclosureNavItem} ${
          isTitleSelected ? styles.selected : ""
        }`}
      >
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
            {React.Children.toArray(children)
              .filter((child): child is React.ReactElement =>
                React.isValidElement(child),
              )
              .map(child =>
                React.cloneElement(child, {
                  selected: location.pathname === child.props.to,
                }),
              )}
          </ul>
        )}
      </AnimatedPresence>
    </div>
  );
}

export default AnimatedPresenceDisclosure;
