import type { Meta, StoryFn } from '@storybook/react';
import { useForm, FieldValues } from 'react-hook-form';
import Input from './';

const meta = {
  title: 'common/Input',
  component: Input,
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryFn<typeof Input>;

const Template: Story = (args) => {
  const { control } = useForm<FieldValues>({ defaultValues: { value: '' } });

  return (
    <Input
      {...args}
      label='Label'
      helperText='Helper Text'
      name='value'
      control={control}
    />
  );
};

export const Outlined = Template.bind({});
export const Filled = Template.bind({});
Filled.args = {
  variant: 'filled',
};
export const Standard = Template.bind({});
Standard.args = {
  variant: 'standard',
};
