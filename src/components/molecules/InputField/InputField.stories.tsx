import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputField } from "./InputField";

const meta = {
  title: "Molecules/InputField",
  component: InputField,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    label: "Email",
    placeholder: "you@airtap.com",
    helperText: "We'll never share your email.",
  },
  argTypes: {
    inputSize: { control: "inline-radio", options: ["small", "medium", "large"] },
    required: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Required: Story = {
  args: { required: true },
};

export const WithError: Story = {
  args: {
    value: "not-an-email",
    errorMessage: "Enter a valid email address.",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <InputField label="Small" inputSize="small" placeholder="Small" />
      <InputField label="Medium" inputSize="medium" placeholder="Medium" />
      <InputField label="Large" inputSize="large" placeholder="Large" />
    </div>
  ),
};
