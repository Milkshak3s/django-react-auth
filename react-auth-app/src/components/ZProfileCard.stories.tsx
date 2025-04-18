import type { Meta, StoryObj } from '@storybook/react';

import ZprofileCard from './ZProfileCard';

const meta = {
  component: ZprofileCard,
} satisfies Meta<typeof ZprofileCard>;

export default meta;

type Story = StoryObj<typeof meta>;


export const Primary: Story = {
  args: {
    userName: "John Doe",
  },
};