import React, {
  ComponentProps,
  FC,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { Canvas, Source } from "@storybook/addon-docs";
import { AnchorMdx, Markdown } from "@storybook/blocks";
import { Code } from "@storybook/components";
import { Heading } from "@jobber/components/Heading";
import { Content } from "@jobber/components/Content";
import "@jobber/design/foundation.css";

/**
 * Maybe you're asking yourself, why is this file here?.
 *
 * This file is here because we need to override the default markdown renderer
 * that storybook uses. We need to do this because we want to render the
 * markdown in a way that is consistent with the rest of our documentation and branding.
 *
 * Ideally in the future we find a better way to organize this file and some of the contents.
 * There are a handful of duplicated components in this file becuase that was easier
 * than bringing in the tooling to import them properly.
 *
 * Contributions to remove these duplications would be greatly appreciated.
 *
 */

type CustomCanvasProps = {
  readonly children: ReactNode | (() => ReactNode);
} & ComponentProps<typeof Canvas>;

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
    <Heading level={level as 1}>
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

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
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

export function InlineCode(props: object): React.JSX.Element {
  const styles = {
    display: "inline-block",
    borderRadius: "var(--radius--base)",
    fontFamily: "monospace",
    background: "var(--color-surface--background)",
    padding: "var(--space-smaller)",
  };

  return <code {...props} style={styles} />;
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
  const isInlineCode =
    typeof className !== "string" &&
    (typeof children !== "string" || !(children as string).match(/[\n\r]/g));

  if (isInlineCode) {
    return <Code>{children}</Code>;
  }

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
  const [content, setContent] = React.useState<string>("");
  const ignoreNext = useRef(false);
  const counter = useRef(0);

  useEffect(() => {
    if (wrapper.current) {
      wrapper.current.innerHTML = wrapper.current.innerHTML.replace(
        /^<div>(.*)<\/div>$/s,
        "$1",
      );
    }
  }, [wrapper]);

  useEffect(() => {
    // The Source component from storybook does not render properly
    // when the code is provided on initial render.
    // By moving it to a useEffect the Source component renders properly.
    setContent(children);
  }, [children]);

  return (
    <div ref={wrapper}>
      <Markdown
        options={{
          wrapper: props => <Content>{props.children}</Content>,
          // This horrific render rule is related to a bug in markdown-to-jsx rendering Markdown Image Links.
          // They have 3 open issues for this bug: https://github.com/quantizor/markdown-to-jsx/issues/531
          // If they fix this bug we should be able to just remove this render rule (and the useRefs at the top of this component for ignoreNext and counter)
          // This is specifically related to the CircleCI badge in the README.md to get it to render properly
          // If you remove this render rule you will see the CircleCI badge render as a broken image.
          // If you want to support another image link, it might be better to just fix the bug in markdown-to-jsx for the
          // community instead of growing this awful hack in our codebase.
          renderRule(next, node) {
            if (
              (node.type == "15" && node.target.includes("circleci")) ||
              ignoreNext.current
            ) {
              const childrenNode = node as { children?: ReactNode[] };

              if (childrenNode?.children?.length === 1 || ignoreNext.current) {
                if (counter.current === 0) {
                  ignoreNext.current = false;
                } else {
                  counter.current -= 1;
                }

                return <></>;
              } else if (childrenNode?.children?.length === 2) {
                counter.current = 2;
                ignoreNext.current = true;

                return (
                  <a href="https://circleci.com/gh/GetJobber/atlantis/tree/master">
                    <img src="https://circleci.com/gh/GetJobber/atlantis/tree/master.svg?style=svg" />
                  </a>
                );
              }
            }

            return next();
          },
          overrides: {
            h1: { component: props => <Header level={1} {...props} /> },
            h2: { component: props => <Header level={2} {...props} isTOC /> },
            h3: { component: props => <Header level={3} {...props} /> },
            h4: { component: props => <Header level={4} {...props} /> },
            h5: { component: props => <Header level={5} {...props} /> },
            h6: { component: props => <Header level={6} {...props} /> },
            a: {
              component: props => (
                <AnchorMdx {...props} style={{ textDecoration: "none" }} />
              ),
            },
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
            code: { component: CodeOrSourceMdx },
            Canvas: { component: CustomCanvas },
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  );
};
