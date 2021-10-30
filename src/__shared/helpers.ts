import { Status } from './enum';

export const isEmpty = (obj: object) => {
  return Object.keys(obj).length > 0;
};

export const transformStatus = (str: string): string => {
  switch (str) {
    case Status.notStarted:
      return 'Не начал';
    case Status.finish:
      return 'Закончил';
    case Status.inProgress:
      return 'В квесте';
    default:
      return str;
  }
}
