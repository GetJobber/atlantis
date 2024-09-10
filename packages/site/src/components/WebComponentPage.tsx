
import { PageWrapper } from '../layout/PageWrapper';
import {
  Box,
  Content,
  Grid,
  Heading,
  InputText,
  Link,
  Page,
  Tabs,
  Tab,
} from '@jobber/components';

import './WebComponentPage.module.css';
import { useParams } from 'react-router';
import { SiteContent } from '../content'
import { PropsTab } from './PropsTab';
import { usePageValues } from '../hooks/usePageValues';
export const WebComponentPage = () => {
  const { name = '' } = useParams<{ name: string }>();
  const PageMeta = SiteContent[name];
  const Component = PageMeta.component.element;
  const { updateValue, mappedProps } = usePageValues(PageMeta?.component.defaultProps)
  const ComponentContent = PageMeta?.content
  return (
    <Grid>
      <Grid.Cell size={{ xs: 12, md: 9 }}>
        <Page
          width="fill"
          title={PageMeta.title}
          subtitle={PageMeta.description}>
          <PageWrapper>
            <component-documentation>
              <Content spacing="large">
                <Box direction='column' gap="small">
                  <preview-window>
                    <Component {...mappedProps} />
                  </preview-window>
                </Box>
                <Tabs>
                  <Tab label='Design'>
                    <Content spacing="large">
                      <ComponentContent />
                    </Content>
                  </Tab>
                  <Tab label='Props'>
                    <PropsTab defaultProps={PageMeta?.props} values={mappedProps} updateValue={updateValue} />
                  </Tab>
                  <Tab label='Code Editor'>
                    <preview-code>
                      <InputText multiline value={PageMeta?.component.code} />
                    </preview-code>
                  </Tab>
                </Tabs>
              </Content>
            </component-documentation>
          </PageWrapper>
        </Page>
      </Grid.Cell>
      <Grid.Cell size={{ xs: 12, md: 3 }}>
        <Content>
          <Box padding="base" direction='column'>
            <Heading level={2}>Links</Heading>
            <Box>
              {PageMeta.links.map((link, index) => (
                <Box>
                  <Link key={index} url={link.url}>{link.label}</Link>
                </Box>
              ))}
            </Box>
          </Box>
        </Content>
      </Grid.Cell>
    </Grid>
  );
};



