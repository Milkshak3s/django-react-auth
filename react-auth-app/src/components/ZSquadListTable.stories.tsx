import type { Meta, StoryObj } from '@storybook/react';

import ZsquadListTable from './ZSquadListTable';

const meta = {
  component: ZsquadListTable,
} satisfies Meta<typeof ZsquadListTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    squads: [
      {
        id: 1,
        name: 'Squad Alpha',
        description: 'Alpha squad description',
        formup: '2025-06-31 0600 UTC',
      },
      {
        id: 2,
        name: 'Squad Bravo',
        description: 'Bravo squad description',
        formup: '2025-06-31 0600 UTC',
      },
    ]
  }
};