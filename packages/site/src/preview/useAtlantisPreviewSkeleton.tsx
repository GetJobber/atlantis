import { type Theme } from "@jobber/components";
import { RefObject } from "react";

const skeletonHTML = (theme: Theme, type: "web" | "mobile") => {
  const imports =
    type == "mobile"
      ? `
      "@jobber/hooks":"/editorMobileBundle.js",
      "@jobber/hooks/useIsMounted":"/editorMobileBundle.js",
      "@jobber/components-native":"/editorMobileBundle.js",
      `
      : `
         "@jobber/hooks":"/editorBundle.js",
         "@jobber/hooks/useIsMounted":"/editorBundle.js",
      "@jobber/components":"/editorBundle.js",
      `;

  return `

<!DOCTYPE html>
<html data-theme="${theme}" data-type="${type}">
<head>
<style>
html,body,#root {
  height: 100%;
  width: 99%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 200px;
  }
  html[data-type="mobile"] {
    border-radius:var(--radius-base);
  }
  #root {
    box-sizing: border-box;
    padding: var(--space-smallest);
  }
</style>
<link rel="stylesheet" href="https://cdn.jobber.com/fonts/fonts.css">
<link rel="stylesheet" href="/styles.css">
<link rel="stylesheet" href="/foundation.css">
<link rel="stylesheet" href="/dark.mode.css">
</head>
      <body style="background-color:transparent;">
 <script type="importmap">
  {
    "imports": {
      ${imports}
      "axios": "/axios.js"
    }
  }
  </script>
      <div id="root">
      </div>
      <script>
        var root;
        var rootElement;
      </script>
      <style>
      @container wrapper (min-width:0px){
        .item > *{
          width: 80%;
          background-color: var(--color-surface--background);
          border-radius: var(--radius-base);
          padding: var(--space-large);
        }
      }
      @container wrapper-two (min-width:0px){
        .item > *{
          width: 80%;
          background-color: var(--color-payments);
          color: var(--color-text--reverse);
          border-radius: var(--radius-base);
          padding: var(--space-large);
        }
          .item h1 {
          color: var(--color-text--reverse--secondary);

          }
          .item p {
          color: var(--color-text--reverse);
          }
      }
  @container wrapper-three (min-width:0px){
 
        .item > *{
          width: 50%;
          background-color: var(--color-success);
          color: var(--color-text--reverse);
          padding: var(--space-large);
        }
          .item h1 {
          color: var(--color-text--secondary);
          background-color: var(--color-surface--background);
          padding: var(--space-small);
          border-radius: var(--radius-base);
          }
          .item p {
          color: var(--color-text--reverse);
          }
      }
      </style>
      <script>
      window.onerror = function(message, source, lineno, colno, error) {
        console.log('ERROR', message, source, lineno, colno, error);
        window.parent.postMessage(JSON.stringify({ message, source, lineno, colno, error }), '*');
        return true;
      };
      window.addEventListener('message', (event) => {
        const { type, code, theme } = event.data;
        if (type === 'updateCode') {
          const script = document.createElement('script');
          script.type = 'module';
          script.textContent = code;
          const root = document.getElementById('root');
          if (root) {
            root.appendChild(script); // Inject new script
          }
        } else if (type === 'updateTheme') {
          document.documentElement.dataset.theme = theme;
          if (window.updateMobileTheme) {
            window.updateMobileTheme(theme);
          }
        }
      });
      </script>


      </body>
      </html>`;
};
export const WebCodeWrapper = (transpiledCode: string | null | undefined) => `
            import {
              AnimatedPresence,
              AnimatedSwitcher,
              AtlantisThemeContextProvider,
              Autocomplete,
              Avatar,
              Banner,
              Box,
              Button,
              ButtonDismiss,
              Card,
              Checkbox,
              Chip,
              Chips,
              Cluster,
              Combobox,
              ConfirmationModal,
              Container,
              Content,
              ContentBlock,
              Countdown,
              Cover,
              DataDump,
              DataList,
              DataTable,
              DatePicker,
              DescriptionList,
              Disclosure,
              Divider,
              Drawer,
              DrawerGrid,
              DurationPeriod,
              Emphasis,
              FeatureSwitch,
              Flex,
              Form,
              FormatDate,
              FormatEmail,
              FormatFile,
              FormatRelativeDateTime,
              FormatTime,
              FormField,
              Frame,
              Gallery,
              Glimmer,
              Grid,
              Heading,
              Icon,
              InlineLabel,
              InputAvatar,
              InputDate,
              InputEmail,
              InputFile,
              InputGroup,
              InputNumber,
              InputPassword,
              InputPhoneNumber,
              InputText,
              InputTime,
              InputValidation,
              LightBox,
              Link,
              List,
              Markdown,
              Menu,
              Modal,
              MultiSelect,
              Option,
              Page,
              Popover,
              ProgressBar,
              RadioGroup,
              RadioOption,
              RecurringSelect,
              ResponsiveSwitcher, 
              SegmentedControl,
              Select,
              SideDrawer,
              SideKick,
              Spinner,
              Stack,
              StatusIndicator,
              StatusLabel,
              Switch,
              Table,
              Header,
              Cell,
              Body,
              Row,
              CellCurrency,
              CellNumeric,
              Footer,
              Tabs,
              Tab,
              Text,
              Tiles,
              Toast,
              showToast,
              Tooltip,
              Typography,
              useState,
              useFormState,
              useRef,
              useEffect,
              ReactDOM,
              React
            } from '@jobber/components';
                ${transpiledCode}

            function RootWrapper() {
              return React.createElement(AtlantisThemeContextProvider, null, React.createElement(App));
            }

          if (rootElement) {
              ReactDOM.unmountComponentAtNode(rootElement);
            }
             if(!rootElement){
              rootElement = document.getElementById('root')
              root = ReactDOM.createRoot(rootElement);
             }
              root.render(React.createElement(RootWrapper, null));
          `;

export const MobileCodeWrapper = (
  transpiledCode: string | null | undefined,
) => `
            import {
              ActionItem,
              ActionItemGroup,
              ActionLabel,
              ActivityIndicator,
              AtlantisThemeContextProvider,
              AutoLink,
              Banner,
              BottomSheet,
              BottomSheetOption,
              Button,
              ButtonGroup,
              Card,
              Content,
              Checkbox,
              Chip,
              ContentOverlay,
              Disclosure,
              Divider,
              EmptyState,
              Flex,
              Icon,
              StatusLabel,
              Glimmer,
              Heading,
              IconButton,
              Form,
              FormField,
              FormatFile,
              InputCurrency,
              InputDate,
              InputEmail,
              InputFieldWrapper,
              InputNumber,
              InputPassword,
              InputPressable,
              InputSearch,
              InputText,
              Menu,
              ProgressBar,
              Select,
              Option,
              Switch,
              Text,
              TextList,
              ThumbnailList,
              Toast,
              showToast,
              Typography,
              useAtlantisTheme,
              useState,
              forwardRef,
              useEffect,
              useRef,
              Host,
              View,
            } from '@jobber/components-native';
                ${transpiledCode}

            function RootWrapper() {
              const themedApp = React.createElement(AtlantisThemeContextProvider, null, React.createElement(function ThemeHandler(props) {
                const { setTheme } = useAtlantisTheme();

                // Make this globally available so the doc's site theme can update it
                window.updateMobileTheme = (theme) => setTheme(theme);

                // Set the initial theme on mount
                useEffect(() => {
                  setTheme(document.documentElement.dataset.theme);
                }, []);

                return React.createElement(App);
              }));
              return React.createElement(Host, {style:{display:'flex',alignItems:'center',justifyContent:'center', width:'100%'}}, themedApp);
            }

            function IntlWrapper() {
              return React.createElement(IntlProvider, {locale: 'en'}, React.createElement(RootWrapper));
            }

          if (rootElement) {
            //  ReactDOM.unmountComponentAtNode(rootElement);
            }
             if(!rootElement){
              rootElement = document.getElementById('root')
              root = ReactDOM.createRoot(rootElement);
             }
              root.render(React.createElement(IntlWrapper, null));
          `;

export const useAtlantisPreviewSkeleton = (type: "web" | "mobile") => {
  const writeSkeleton = (
    doc: Document | null | undefined,
    iframeTheme: Theme,
  ) => {
    if (doc) {
      doc.open();
      doc.write(skeletonHTML(iframeTheme, type));
      doc.close();
    }
  };

  const updateIframeCode = (
    currentFrame: HTMLIFrameElement,
    transpiledCode: string | null | undefined,
  ) => {
    const iframeWindow = currentFrame.contentWindow;

    if (iframeWindow) {
      const codeWrapper =
        type == "web"
          ? WebCodeWrapper(transpiledCode)
          : MobileCodeWrapper(transpiledCode);
      iframeWindow.postMessage({ type: "updateCode", code: codeWrapper }, "*");
    }
  };

  const writeCodeToIFrame = (
    html: string | undefined,
    selectedFrame: RefObject<HTMLIFrameElement>,
    theme: Theme,
    transpiledCode: string | null | undefined,
  ) => {
    if (html === "<html><head></head><body></body></html>") {
      selectedFrame?.current?.addEventListener("load", () => {
        if (selectedFrame.current) {
          const iframeDocument = selectedFrame.current.contentDocument;

          if (iframeDocument) {
            selectedFrame.current.style.height =
              iframeDocument.body.scrollHeight + 60 + "px";
          }
          updateIframeCode(selectedFrame.current, transpiledCode);
        }
      });
      writeSkeleton(selectedFrame.current?.contentDocument, theme);
    } else if (selectedFrame.current) {
      updateIframeCode(selectedFrame.current, transpiledCode);
    } else {
      console.log("tried to update iframe");
    }
  };

  return { writeCodeToIFrame };
};
