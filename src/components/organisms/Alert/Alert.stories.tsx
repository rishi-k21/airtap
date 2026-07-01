import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "./Alert";
import { Button } from "../../atoms/Button";

const meta = {
  title: "Organisms/Alert",
  component: Alert,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    tone: "information",
    title: "Heads up",
    children: "This is an informational alert with some supporting detail.",
  },
  argTypes: {
    tone: {
      control: "inline-radio",
      options: ["neutral", "success", "information", "warning", "error"],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 520 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { onDismiss: () => {} } };

export const WithActions: Story = {
  args: {
    tone: "error",
    title: "Payment failed",
    children: "We couldn't process your last payment. Update your method to continue.",
    actions: (
      <>
        <Button size="small">Update payment</Button>
        <Button size="small" variant="transparent">
          Dismiss
        </Button>
      </>
    ),
  },
};

export const Tones: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Alert tone="neutral" title="Neutral">A general message.</Alert>
      <Alert tone="success" title="Success">Your changes were saved.</Alert>
      <Alert tone="information" title="Information">A new feature is available.</Alert>
      <Alert tone="warning" title="Warning">Your storage is almost full.</Alert>
      <Alert tone="error" title="Error">Something went wrong.</Alert>
    </div>
  ),
};
