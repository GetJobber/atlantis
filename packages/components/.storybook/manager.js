import {addons} from '@storybook/manager-api';
import {create} from '@storybook/theming/create';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: '🔱 Atlantis',
    colorPrimary: '#3A10E5',
    colorSecondary: 'hsl(107, 58%, 33%)',
    base: 'light',
    // Typography
    fontBase: '"Jobber Pro", "Poppins", Helvetica, Arial, sans-serif',
    fontCode: 'monospace',

    brandUrl: 'https://example.com',
    brandImage: 'https://atlantis.getjobber.com/',
    brandTarget: '_self',

    // UI
    appContentBg: '#ffffff',
    appPreviewBg: '#ffffff',
    appBorderColor: '#585C6D',
    appBorderRadius: 4,

    // Text colors
    textColor: '#10162F',
    textInverseColor: '#ffffff',

    // Toolbar default and active colors
    barTextColor: '#9E9E9E',
    barSelectedColor: '#585C6D',
    barHoverColor: '#585C6D',
    barBg: '#ffffff',

    // Form colors
    inputBg: '#ffffff',
    inputBorder: '#10162F',
    inputTextColor: '#10162F',
    inputBorderRadius: 2,
  }),
});
