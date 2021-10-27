import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Props, Dnd } from '../Dnd';

export default {
  title: 'Components/Dnd',
  component: Dnd,
} as Meta;

const Template: Story<Props> = (): JSX.Element => <Dnd />;

export const Primary = Template.bind({});
