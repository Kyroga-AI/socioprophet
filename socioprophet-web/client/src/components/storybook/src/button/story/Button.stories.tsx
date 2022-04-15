import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ButtonProps, Button } from '../Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    borderColor: { control: 'color' },
  },
} as Meta;

const Template: Story<ButtonProps> = (args): JSX.Element => <Button {...args} />;

export const Primary = Template.bind({});
export const Secondary = Template.bind({});

Primary.args = {
  label: 'Primary',
  size: 'sm',
  borderColor: 'light',
  color: 'blue',
};

Secondary.args = {
  label: 'Secondary',
  size: 'lg',
  borderColor: 'dark',
};
