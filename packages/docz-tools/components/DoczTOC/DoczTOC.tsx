/** @jsx jsx */
import { jsx } from "theme-ui";
import { useCurrentDoc } from "docz";
// eslint-disable-next-line import/no-internal-modules
import { Heading } from "docz/dist/state";
import { Card } from "@jobber/components/Card";
import { Content } from "@jobber/components/Content";
import * as styles from "./styles";

interface DoczTOC {
  readonly maxDepth?: 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * An array of items to exclude.
   */
  readonly exclude?: string[];
  readonly title?: string;
}

export function DoczTOC({
  exclude,
  maxDepth = 6,
  title = "Table of contents",
}: DoczTOC) {
  const { headings } = useCurrentDoc();

  return (
    <Card title={title}>
      <Content>
        <ul sx={styles.list}>
          {headings
            .filter((heading: Heading) => {
              return !(
                (maxDepth && heading.depth > maxDepth) ||
                (exclude && exclude.includes(heading.value)) ||
                (exclude && exclude.includes(heading.slug))
              );
            })
            .map((heading: Heading) => (
              <li
                key={heading.slug}
                sx={styles.item(`l${heading.depth}` as styles.LevelType)}
              >
                <a href={`#${heading.slug}`} sx={styles.link}>
                  {heading.value}
                </a>
              </li>
            ))}
        </ul>
      </Content>
    </Card>
  );
}
