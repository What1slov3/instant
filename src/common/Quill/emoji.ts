import { DeltaStatic } from 'quill';
import Delta from 'quill-delta';
import { quillGetText } from './utils';
import { regexEmojiShortname } from '@common/regexs';
import emojiShortnames from '@common/emojiShortnames';
import type Quill from 'quill';

export function emojiQuill(quill: Quill) {
  quill.on('text-change', (_, __, source) => {
    if (source !== 'user') {
      return;
    }

    let indexOffset = 0;

    [...quillGetText(quill).matchAll(regexEmojiShortname)].forEach((shortnameMatch) => {
      const emojiMatch = Object.keys(emojiShortnames).find(
        (key: string) => key === shortnameMatch[0]
      ) as keyof typeof emojiShortnames;

      if (emojiMatch && emojiShortnames[emojiMatch] && typeof shortnameMatch.index === 'number') {
        quill.updateContents(
          new Delta()
            .retain(shortnameMatch.index - indexOffset)
            .insert(emojiShortnames[emojiMatch])
            .delete(shortnameMatch[0].length) as unknown as DeltaStatic,
          'api'
        );

        queueMicrotask(() => {
          if (shortnameMatch.index) {
            quill.setSelection(shortnameMatch.index + 2, 0);
          }
        });

        indexOffset += shortnameMatch[0].length - emojiShortnames[emojiMatch].length;
      }
    });
  });
}
