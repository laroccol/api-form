import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Button from "./Button";

export default {
  title: "Example/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: "Primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: "Secondary",
};

export const Large = Template.bind({});
Large.args = {
  label: "Large",
};

export const Small = Template.bind({});
Small.args = {
  label: "Small",
};
