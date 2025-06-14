const Logger = {
  info: (message: string) => {
    if (__DEV__) {
      console.log('\x1b[44m INFO \x1b[0m', message);
      console.log(' ');
    }
  },
  success: (message: string) => {
    if (__DEV__) {
      console.log(`${message}`.padEnd(100, '.') + '\x1b[32m DONE\x1b[0m');
    }
  },
  warning: (message: string) => {
    if (__DEV__) {
      console.log('\x1b[43m WARN \x1b[0m', message);
    }
  },
  error: (message: string, error?: any) => {
    if (__DEV__) {
      console.log('\x1b[41m ERROR \x1b[0m', message);
      if (error) console.log(error);
    }
  },
  space: () => {
    if (__DEV__) {
    }
  },
};

export {Logger};
