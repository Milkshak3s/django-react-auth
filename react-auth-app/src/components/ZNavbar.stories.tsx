import type { Meta, StoryObj } from '@storybook/react';

import Znavbar from './ZNavbar';

const meta = {
  component: Znavbar,
} satisfies Meta<typeof Znavbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};