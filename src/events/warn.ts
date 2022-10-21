import {captureMessage} from "@sentry/node";

export default {
  name: 'warn',
  once: false,
  async execute(warn: string) {
    captureMessage(warn, 'warning');
  }
}
