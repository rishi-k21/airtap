import type { Meta, StoryObj } from "@storybook/react-vite";
import { Divider } from "./Divider";

const meta = {
  title: "Atoms/Divider",
  component: Divider,
  tags: ["autodocs"],
  args: { orientation: "horizontal" },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div style={{ width: 280 }}>
      <p style={{ color: "var(--text-body)" }}>Above</p>
      <Divider />
      <p style={{ color: "var(--text-body)" }}>Below</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, height: 40, alignItems: "center", color: "var(--text-body)" }}>
      <span>Left</span>
      <Divider orientation="vertical" />
      <span>Right</span>
    </div>
  ),
};
