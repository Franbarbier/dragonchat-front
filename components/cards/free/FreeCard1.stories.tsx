import { ComponentMeta, ComponentStory } from '@storybook/react';
import FreeCard1, { IFreeCard1 } from './FreeCard1';
import { mockFreeCard1Props } from './FreeCard1.mocks';

export default {
  title: 'cards/free/FreeCard1',
  component: FreeCard1,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof FreeCard1>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FreeCard1> = (args) => (
  <FreeCard1 {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockFreeCard1Props.base,
} as IFreeCard1;