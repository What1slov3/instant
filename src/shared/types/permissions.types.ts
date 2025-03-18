// TODO Получение пермишенов должно быть с сервера
export enum EPermissions {
  'OWNER' = 2 ** 0,
  'ADMIN' = 2 ** 1,
}

export enum EPermissionsContext {
  CHANNEL = 'channel',
  CHAT = 'chat'
}