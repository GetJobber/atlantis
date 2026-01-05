import { AnimatedPresence, Button, Typography } from "@jobber/components";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./NavMenu.module.css";
import { useAtlantisSite } from "../providers/AtlantisSiteProvider";

interface ChildProps {
  readonly to?: string;
  readonly selected?: boolean;
}

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
  const { pathname } = useLocation();

  const childrenArray = useMemo(
    () => React.Children.toArray(children),
    [children],
  );

  const { toggleMobileMenu } = useAtlantisSite();

  // Determine if any child is selected based on the current URL
  const hasSelectedChild = childrenArray.some(
    child =>
      React.isValidElement<ChildProps>(child) && pathname === child.props.to,
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
      const selectedElement = document.querySelector(`[href="${pathname}"]`);

      if (selectedElement) {
        selectedElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [isOpen, pathname]);

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  // Keeps from having the Disclosure title and the child both highlighted
  const isTitleSelected = pathname === to;

  return (
    <div>
      <span
        className={`${styles.disclosureNavItem} ${
          isTitleSelected ? styles.selected : ""
        } stickySectionHeader`}
      >
        <Link to={to ?? "/"} tabIndex={0} onClick={toggleMobileMenu}>
          <Typography fontWeight="semiBold" size={"large"} textColor="heading">
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
            {childrenArray
              .filter((child): child is React.ReactElement<ChildProps> =>
                React.isValidElement(child),
              )
              .map(child =>
                React.cloneElement(child, {
                  selected: pathname === child.props.to,
                }),
              )}
          </ul>
        )}
      </AnimatedPresence>
    </div>
  );
}

export default AnimatedPresenceDisclosure;
