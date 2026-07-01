import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta = {
  title: "Atoms/Badge",
  component: Badge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { children: "Badge", tone: "neutral", size: "md" },
  argTypes: {
    tone: {
      control: "inline-radio",
      options: ["neutral", "success", "info", "warning", "error", "accent"],
    },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    dot: { control: "boolean" },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Tones: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Badge tone="neutral" dot>Neutral</Badge>
      <Badge tone="success" dot>Success</Badge>
      <Badge tone="info" dot>Info</Badge>
      <Badge tone="warning" dot>Warning</Badge>
      <Badge tone="error" dot>Error</Badge>
      <Badge tone="accent" dot>Accent</Badge>
    </div>
  ),
};
