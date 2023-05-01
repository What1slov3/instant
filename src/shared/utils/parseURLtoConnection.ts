import type { Connection } from '@shared/types';

export function parseURLtoConnection(): Partial<Connection> {
  const splittedPathname = window.location.pathname.slice(1).split('/');
  let connection: string[] = [];

  if (splittedPathname[0] === 'channels') {
    connection = splittedPathname.slice(1);
  }

  return {
    channelId: connection[0] || null,
    chatId: connection[1] || null,
  };
}
