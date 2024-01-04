import React, {
  ComponentProps,
  FC,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { Canvas, Markdown, Source } from "@storybook/addon-docs";
import { Code } from "@storybook/components";
import { Heading } from "@jobber/components/Heading";
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

export const CodeOrSourceMdx: FC<
  PropsWithChildren<{ readonly className?: string }>
> = ({ className, children, ...rest }) => {
  // markdown-to-jsx does not add className to inline code
  if (
    typeof className !== "string" &&
    (typeof children !== "string" || !(children as string).match(/[\n\r]/g))
  ) {
    return <Code>{children}</Code>;
  }
  // className: "lang-jsx"
  const language = className && className.split("-");

  return (
    <Source
      language={(language && language[1]) || "text"}
      format={false}
      code={children as string}
      {...rest}
    />
  );
};

export const MarkdownWrapper = ({
  children,
}: {
  readonly children: string;
}) => {
  const wrapper = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (wrapper.current) {
      wrapper.current.innerHTML = wrapper.current.innerHTML.replace(
        /^<div>(.*)<\/div>$/s,
        "$1",
      );
    }
  }, [wrapper]);

  return (
    <div ref={wrapper}>
      <Markdown
        options={{
          wrapper: props => <Content>{props.children}</Content>,
          overrides: {
            h1: { component: props => <Heading level={1} {...props} /> },
            h2: { component: props => <Heading level={2} {...props} /> },
            h3: { component: props => <Heading level={3} {...props} /> },
            h4: { component: props => <Heading level={4} {...props} /> },
            h5: { component: props => <Heading level={5} {...props} /> },
            h6: { component: props => <Heading level={6} {...props} /> },
            blockquote: {
              component: props => (
                <blockquote
                  {...props}
                  style={{
                    margin: "16px 0px",
                    borderLeft: `4px solid rgb(221, 221, 221)`,
                    padding: "0 15px",
                  }}
                />
              ),
            },
            code: CodeOrSourceMdx,
            Canvas: CustomCanvas,
          },
        }}
      >
        {children}
      </Markdown>
    </div>
  );
};
