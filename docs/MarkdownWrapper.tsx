import React, {
  ComponentProps,
  FC,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { Canvas, Source } from "@storybook/addon-docs";
import { Code } from "@storybook/components";
import { Markdown } from "@storybook/blocks";
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

let ignoreNext = false;
let counter = 0;

export const MarkdownWrapper = ({
  children,
}: {
  readonly children: string;
}) => {
  const wrapper = useRef<HTMLDivElement>(null);
  const [content, setContent] = React.useState<string>("");

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
          // If they fix this bug we should be able to just remove this render rule
          // This is specifically related to the CircleCI badge in the README.md to get it to render properly
          // If you remove this render rule you will see the CircleCI badge render as a broken image.
          // If you want to support another image link, it might be better to just fix the bug in markdown-to-jsx for the
          // community instead of growing this awful hack in our codebase.
          renderRule(next, node) {
            if (
              (node.type == "15" && node.target.includes("circleci")) ||
              ignoreNext
            ) {
              if (node?.children?.length === 1 || ignoreNext) {
                if (counter === 0) {
                  ignoreNext = false;
                } else {
                  counter -= 1;
                }

                return null;
              } else if (node?.children?.length === 2) {
                counter = 2;
                ignoreNext = true;

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
            details: { component: "details" },
            summary: { component: "summary" },
            h1: { component: props => <Header level={1} {...props} /> },
            h2: { component: props => <Header level={2} {...props} isTOC /> },
            h3: { component: props => <Header level={3} {...props} /> },
            h4: { component: props => <Header level={4} {...props} /> },
            h5: { component: props => <Header level={5} {...props} /> },
            h6: { component: props => <Header level={6} {...props} /> },
            a: {
              component: props => (
                <a {...props} style={{ textDecoration: "none" }} />
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
