import type { Meta, StoryObj } from "@storybook/react-vite";
import { Typography } from "./Typography";

const meta = {
  title: "Atoms/Typography",
  component: Typography,
  tags: ["autodocs"],
  args: { children: "The quick brown fox jumps over the lazy dog" },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { args: { variant: "body" } };

export const Scale: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="h5">Heading 5</Typography>
      <Typography variant="h6">Heading 6</Typography>
      <Typography variant="body">Body — base paragraph text.</Typography>
      <Typography variant="bodySmall">Body Small — secondary text.</Typography>
      <Typography variant="bodyXSmall">Body X-Small — fine print.</Typography>
      <Typography variant="caption">CAPTION TEXT</Typography>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Typography color="title">Title</Typography>
      <Typography color="body">Body</Typography>
      <Typography color="small">Small</Typography>
      <Typography color="subtle">Subtle</Typography>
      <Typography color="muted">Muted</Typography>
      <Typography color="success">Success</Typography>
      <Typography color="info">Info</Typography>
      <Typography color="warning">Warning</Typography>
      <Typography color="error">Error</Typography>
    </div>
  ),
};
