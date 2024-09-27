import { addons } from '@storybook/manager-api';
import brandTheme from './brandTheme';

addons.setConfig({
  theme: brandTheme,
});