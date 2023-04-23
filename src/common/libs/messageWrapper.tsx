import { ReactNode } from 'react';
import reactStringReplace from 'react-string-replace';
import { regexEmoji, regexEmojiShortname, regexURL } from '@common/regexs';
import emojiShortnames from '@common/emojiShortnames';
import TEXTS from '@common/texts';
import Tooltip from '@components/Tooltip/Tooltip';

export const contentWrappers = {
  // wrapInviteURL: (text: string | ReactNode[]) => {
  //   return reactStringReplace(text, regexInviteURL, (match, i) => {
  //     return (
  //       <Link key={match + i} to={`/invites/${match}`} className="inMessageUrl">
  //         {`${CONSTANTS.URL}/invites/${match}`}
  //       </Link>
  //     );
  //   });
  // },
  wrapUrl: (text: string | ReactNode[]) => {
    return reactStringReplace(text, regexURL, (match, i) => {
      return (
        <a key={match + i} href={match} target="_blank" className="inMessageUrl">
          {match}
        </a>
      );
    });
  },
  wrapEmoji: (text: string | ReactNode[]) => {
    return reactStringReplace(text, /(\p{Emoji_Presentation})/gu, (match, i) => {
      const shortname = Object.keys(emojiShortnames).find(
        (key: string) => emojiShortnames[key as keyof typeof emojiShortnames] === match
      );
      return (
        <Tooltip key={match + i} className="inMessageEmoji" position="top" text={shortname || TEXTS.UNSUPPORTED_EMOJI}>
          {match}
        </Tooltip>
      );
    });
  },
  wrapEmojiShortname: (text: string | ReactNode[]) => {
    return reactStringReplace(text, regexEmojiShortname, (match, i) => {
      const emoji = emojiShortnames[`:${match}:` as keyof typeof emojiShortnames];
      if (emoji) {
        return (
          <Tooltip
            key={match + i}
            className="inMessageEmoji"
            position="top"
            text={`:${match}:` || TEXTS.UNSUPPORTED_EMOJI}
          >
            {emoji}
          </Tooltip>
        );
      }
      return text;
    });
  },
};

export const wrapAllFormatting = (text: any) => {
  for (const key in contentWrappers) {
    text = contentWrappers[key as keyof typeof contentWrappers](text);
  }
  return text;
};
