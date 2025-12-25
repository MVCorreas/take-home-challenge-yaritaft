import { ValidationError } from "../errors.js";
import { emailChannel } from "./emailChannel.js";
import { smsChannel } from "./smsChannel.js";
import { pushChannel } from "./pushChannel.js";

export const getChannel = (channelType) => {
  const channels = {
    EMAIL: emailChannel,
    SMS: smsChannel,
    PUSH: pushChannel,
  };

  const channel = channels[channelType];

  if (!channel) {
    throw new ValidationError(`Unknown channel: ${channelType}`);
  }

  return channel;
};
