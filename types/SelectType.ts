export enum Time {
  all = 'all',
  new = 'new',
  sellest = 'sellest',
}
export enum Price {
  all = 'all',
  up = 'up',
  down = 'down',
}

export interface ItemOptions {
  title: string;
  value: Time | Price;
}
