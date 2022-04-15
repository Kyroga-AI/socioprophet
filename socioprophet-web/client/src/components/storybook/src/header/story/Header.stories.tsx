import React from 'react';
import { Story, Meta } from '@storybook/react';
import { HeaderProps, Header } from '../Header';

export default {
  title: 'Components/Header',
  component: Header,
} as Meta;

const Template: Story<HeaderProps> = (args): JSX.Element => <Header {...args} />;

export const SPHeader = Template.bind({});
