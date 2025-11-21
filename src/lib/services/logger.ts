export interface LogContext {
  message: string;
  context?: Record<string, unknown>;
  error?: unknown;
}

export interface Logger {
  error: (entry: LogContext) => void;
}

const formatError = (entry: LogContext): string => {
  const contextPayload = entry.context ? ` | context: ${JSON.stringify(entry.context)}` : "";
  const errorPayload = entry.error instanceof Error ? ` | error: ${entry.error.message}` : "";

  return `${entry.message}${contextPayload}${errorPayload}`;
};

const defaultLogger: Logger = {
  error: (entry: LogContext) => {
    console.error(formatError(entry));
  },
};

export const logger: Logger = defaultLogger;

export const logError = (entry: LogContext): void => {
  logger.error(entry);
};
