import type { Meta, StoryObj } from '@storybook/react';

import ZCreateSquadForm from './ZCreateSquadForm';

const meta = {
  component: ZCreateSquadForm,
} satisfies Meta<typeof ZCreateSquadForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};