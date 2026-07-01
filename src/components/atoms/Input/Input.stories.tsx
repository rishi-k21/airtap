import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";
import { Icon } from "../Icon";

const meta = {
  title: "Atoms/Input",
  component: Input,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    inputSize: { control: "inline-radio", options: ["small", "medium", "large"] },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: { placeholder: "Enter text…", inputSize: "medium" },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithIcon: Story = {
  args: { startAdornment: <Icon name="search" /> },
};
export const Error: Story = { args: { error: true, defaultValue: "Invalid" } };
export const Disabled: Story = { args: { disabled: true, value: "Disabled" } };
