import React, { ComponentProps, PropsWithChildren, ReactNode } from "react";
import { Canvas, Markdown } from "@storybook/addon-docs";
import { Heading } from "@jobber/components/Heading";
import { Text } from "@jobber/components/Text";
import "@jobber/design/foundation.css";
import { Content } from "@jobber/components/Content";

interface HeaderProps {
  readonly id: string;
  readonly level: number;
  readonly isTOC: boolean;
}

export function Header({
  id,
  level,
  children,
  isTOC = false,
}: PropsWithChildren<HeaderProps>) {
  return (
    <Heading level={level}>
      <a
        style={{
          color: "inherit",
          textDecoration: "none",
        }}
        href={`${window.parent.location.origin}/${window.parent.location.search}#${id}`}
        id={id}
        target="_parent"
        data-toc={isTOC}
        onClick={handleClick}
      >
        {children}
      </a>
    </Heading>
  );

  function handleClick(e) {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    window.parent.history.pushState(
      "",
      "",
      `${window.parent.location.search}#${id}`,
    );
    navigator.clipboard.writeText(window.parent.location.href);
  }
}

export function InlineCode(props: object): JSX.Element {
  const styles = {
    display: "inline-block",
    borderRadius: "var(--radius--base)",
    fontFamily: "monospace",
    background: "var(--color-surface--background)",
    padding: "var(--space-smaller)",
  };

  return <code {...props} style={styles} />;
}

interface CustomCanvasProps extends ComponentProps<typeof Canvas> {
  readonly children: ReactNode | (() => undefined);
}

/**
 * Storybook Doc Canvas doesn't allow `() => void` child so this component makes
 * it happen.
 */
export function CustomCanvas({ children, ...props }: CustomCanvasProps) {
  return (
    <Canvas {...props}>
      {typeof children === "function" ? children() : children}
    </Canvas>
  );
}
const NoWrapper = ({ children }: PropsWithChildren) => <>{children}</>;

export const MarkdownWrapper = ({
  children,
}: {
  readonly children: string;
}) => {
  return (
    <Markdown
      options={{
        overrides: {
          NoWrapper,
          wrapper: props => <Content>{props.children}</Content>,
          h1: { component: props => <Heading level={1} {...props} /> },
          h2: { component: props => <Heading level={2} {...props} /> },
          h3: { component: props => <Heading level={3} {...props} /> },
          h4: { component: props => <Heading level={4} {...props} /> },
          h5: { component: props => <Heading level={5} {...props} /> },
          h6: { component: props => <Heading level={6} {...props} /> },
          p: props => <Text {...props} />,
          inlineCode: props => <InlineCode {...props} />,
          Canvas: CustomCanvas,
        },
      }}
    >
      {children}
    </Markdown>
  );
};
