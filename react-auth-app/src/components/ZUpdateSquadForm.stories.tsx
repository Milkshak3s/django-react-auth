import type { Meta, StoryObj } from '@storybook/react';

import ZupdateSquadForm from './ZUpdateSquadForm';

const meta = {
  component: ZupdateSquadForm,
} satisfies Meta<typeof ZupdateSquadForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    squadId: "1",
  }
};
