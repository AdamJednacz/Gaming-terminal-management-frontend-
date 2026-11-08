
import { isAxiosError } from 'axios';
import type { ApiErrorResponse } from '../common/models/apiError.model';

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

export const getApiErrorMessages = (error: unknown): string[] => {
  if (isAxiosError<ApiErrorResponse>(error)) {
    if (!error.response) {
      return ['No connection to the server. Please try again.'];
    }

    const { message } = error.response.data ?? {};
    if (message) {
      const messages = Array.isArray(message) ? message : [message];
      return messages.map(capitalize);
    }
  }

  return ['Something went wrong. Please try again.'];
};