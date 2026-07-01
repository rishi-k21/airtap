import type { Meta, StoryObj } from "@storybook/react-vite";
import { Snackbar } from "./Snackbar";

const meta = {
  title: "Molecules/Snackbar",
  component: Snackbar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    tone: "neutral",
    message: "Changes saved.",
    actionLabel: "Undo",
  },
  argTypes: {
    tone: {
      control: "inline-radio",
      options: ["neutral", "success", "information", "warning", "error"],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 420 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Snackbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { onDismiss: () => {}, onAction: () => {} },
};

export const Tones: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Snackbar tone="success" message="Profile updated successfully." onDismiss={() => {}} />
      <Snackbar tone="information" message="A new version is available." actionLabel="Reload" onAction={() => {}} />
      <Snackbar tone="warning" message="Your trial ends in 3 days." onDismiss={() => {}} />
      <Snackbar tone="error" message="Could not connect to the server." actionLabel="Retry" onAction={() => {}} />
    </div>
  ),
};
