import {captureException} from "@sentry/node";

export default {
  name: 'error',
  once: false,
  execute(error: Error) {
    captureException(error);
  }
}
