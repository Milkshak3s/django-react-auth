import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from "react-router-dom";

import ZsquadContainer from './ZSquadContainer';

const meta = {
  component: ZsquadContainer,
  decorators: [
		(Story) => (
			<MemoryRouter>
				<Story />
			</MemoryRouter>
		),
  ]
} satisfies Meta<typeof ZsquadContainer>;

export default meta;

type Story = StoryObj<typeof meta>;


export const Primary: Story = {
  args: {
	squadId: "1",
  },
};