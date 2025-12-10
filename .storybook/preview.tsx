import React from 'react';
import type { Preview, Decorator } from '@storybook/nextjs-vite';
import { AppProviders } from '../src/shared/lib/providers/AppProviders';
import '../src/app/globals.css';

const WithAppProviders: Decorator = (Story, context) => {
  const theme = (context.globals.theme as 'light' | 'dark' | 'system') ?? 'light';

  return (
    <AppProviders forcedTheme={theme}>
      <Story />
    </AppProviders>
  );
};

const preview: Preview = {
  decorators: [WithAppProviders],
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Переключатель темы',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
          { value: 'system', title: 'System' },
        ],
      },
    },
  },
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;