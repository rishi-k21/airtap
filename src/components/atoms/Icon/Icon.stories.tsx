import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon, type IconName } from "./Icon";

const names: IconName[] = [
  "check",
  "close",
  "info",
  "warning",
  "error",
  "success",
  "search",
  "chevron-down",
  "eye",
  "logo",
];

const meta = {
  title: "Atoms/Icon",
  component: Icon,
  tags: ["autodocs"],
  args: { name: "check", size: 24 },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Gallery: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 20, flexWrap: "wrap", color: "var(--text-title)" }}>
      {names.map((n) => (
        <div key={n} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, width: 72 }}>
          <Icon name={n} size={24} />
          <span style={{ fontSize: 11, color: "var(--text-small)" }}>{n}</span>
        </div>
      ))}
    </div>
  ),
};
