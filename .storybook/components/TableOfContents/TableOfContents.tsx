import React, { useEffect, useState } from "react";
import { Content } from "@jobber/components/Content";
import { Button } from "@jobber/components/Button";
import { Heading } from "@jobber/components/Heading";
import { Text } from "@jobber/components/Text";
import { Tooltip } from "@jobber/components/Tooltip";
import { Divider } from "@jobber/components/Divider";

interface TableOfContentsProps {
  readonly githubInfo?: GithubInfo;
}

interface GithubInfo {
  readonly repo: string;
  readonly name: string;
  readonly viewFile: string;
  readonly editFile: string;
}

export function TableOfContents({ githubInfo }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Element[]>([]);

  useEffect(() => {
    const anchors = Array.from(document.querySelectorAll("h2"));
    if (anchors.length < 2) return;
    setHeadings(anchors);
  }, []);

  return (
    <div style={{ padding: "var(--space-base)" }}>
      <Content spacing="large">
        <div style={{ display: "flex", gap: "var(--space-small)" }}>
          <Tooltip message="View Atlantis on GitHub">
            <Button
              /**
               *  Disabling ts for this line as we don't have a Github icon in
               * Jobber icons. This is bad. Do not copy this pattern.
               */
              // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
              // @ts-ignore
              label={<Github />}
              url={githubInfo?.repo}
              external={true}
              type="secondary"
              ariaLabel={""}
            />
          </Tooltip>

          <Tooltip message={`View ${githubInfo?.name} on GitHub`}>
            <Button
              url={githubInfo?.viewFile}
              icon="embed"
              external
              type="secondary"
              ariaLabel={`View ${githubInfo?.name} directory on GitHub`}
            />
          </Tooltip>

          <Button
            icon="edit"
            label="Edit"
            url={githubInfo?.editFile}
            external={true}
          />
        </div>

        {headings.length > 1 && (
          <nav>
            <Content spacing="small">
              <Heading level={6}>Contents</Heading>
              <Divider />
              {headings.map(header => {
                return (
                  <Text key={header.id}>
                    <a href={`#${header.id}`} target="_self">
                      {header.textContent}
                    </a>
                  </Text>
                );
              })}
            </Content>
          </nav>
        )}
      </Content>
    </div>
  );
}

function Github() {
  return (
    <svg
      height="24"
      viewBox="-1163 1657.697 56.693 56.693"
      xmlns="http://www.w3.org/2000/svg"
      style={{ fill: "var(--color-green)" }}
    >
      <path
        clipRule="evenodd"
        d="M-1134.66 1662.916c-13.6 0-24.63 11.027-24.63 24.63 0 10.882 7.057 20.115 16.844 23.371 1.23.228 1.683-.534 1.683-1.184 0-.587-.023-2.528-.034-4.586-6.852 1.49-8.298-2.906-8.298-2.906-1.12-2.847-2.734-3.604-2.734-3.604-2.235-1.529.168-1.497.168-1.497 2.473.173 3.776 2.538 3.776 2.538 2.196 3.765 5.761 2.677 7.167 2.047.221-1.591.86-2.678 1.564-3.293-5.47-.623-11.222-2.735-11.222-12.172 0-2.69.962-4.886 2.538-6.611-.256-.62-1.099-3.126.239-6.519 0 0 2.068-.661 6.774 2.525 1.965-.545 4.072-.82 6.165-.829 2.093.01 4.202.284 6.17.83 4.701-3.187 6.767-2.526 6.767-2.526 1.34 3.393.497 5.898.241 6.519 1.58 1.725 2.535 3.922 2.535 6.61 0 9.46-5.762 11.544-11.246 12.153.883.765 1.67 2.264 1.67 4.561 0 3.296-.028 5.948-.028 6.76 0 .655.443 1.423 1.691 1.181 9.782-3.26 16.83-12.49 16.83-23.368 0-13.603-11.027-24.63-24.63-24.63z"
        fillRule="evenodd"
      />
      <path d="M-1149.961 1698.28c-.054.122-.247.159-.422.075-.18-.08-.28-.248-.221-.37.053-.126.245-.161.424-.077.179.08.28.249.219.371zm-.303-.225M-1148.963 1699.392c-.118.109-.348.058-.504-.114-.16-.172-.19-.401-.071-.512.12-.108.343-.057.505.114.16.174.192.402.07.512zm-.235-.252M-1147.992 1700.81c-.151.106-.398.007-.55-.212-.152-.219-.152-.482.003-.587.152-.105.396-.01.55.207.15.223.15.485-.003.592zm0 0M-1146.662 1702.181c-.135.15-.423.109-.633-.094-.215-.199-.275-.48-.14-.63.137-.149.426-.107.638.095.214.198.279.482.135.63zm0 0M-1144.826 1702.977c-.06.193-.337.28-.616.198-.279-.084-.46-.31-.405-.505.058-.194.337-.285.617-.198.279.084.461.309.404.505zm0 0M-1142.81 1703.124c.006.203-.23.372-.523.375-.295.007-.533-.157-.536-.357 0-.205.23-.372.525-.377.293-.006.533.158.533.36zm0 0M-1140.935 1702.805c.035.198-.169.402-.46.456-.285.053-.55-.07-.586-.267-.036-.203.171-.406.457-.459.291-.05.552.069.589.27zm0 0" />
    </svg>
  );
}
