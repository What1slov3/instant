export const regex = {
  url: /(https?:\/\/\S+)/gim,
  emoji: /\p{Emoji}\uFE0F|\p{Emoji_Presentation}/gmu,
  emojiShortname: /\:(.*?)\:/gm,
  inviteURL: new RegExp(`${process.env.REACT_APP_HOST_URL}/(\S+)`, 'gim'),
  stringTemplate: /{{(\S+)}}/gm,
};
