import { ComponentMeta, ComponentStory } from '@storybook/react';
import { mockCardsContProps } from './CardsCont.mocks';
import CardsCont, { ICardsCont } from './CardsContFree';

export default {
  title: 'cards/free/CardsCont',
  component: CardsCont,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof CardsCont>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CardsCont> = (args) => (
  <CardsCont {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockCardsContProps.base,
} as ICardsCont;