function createStyledLogger(service: string, style: string) {
  return (...args: any[]) => {
    console.log(`%c${service}`, style, ...args);
  };
}

export const socketStyledLogger = createStyledLogger(
  'Socket',
  'background: #ba66ff; padding: 3px 5px; border-radius: 3px; font-weight: 700'
);

export const stateStyledLogger = createStyledLogger(
  'State',
  'background: #5925dc; padding: 3px 5px; border-radius: 3px; font-weight: 700'
);
