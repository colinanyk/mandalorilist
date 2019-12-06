export class LocalStorageWrapper {
  TOKEN: string = 'token';
  USER_ID: string = 'userId';

  constructor() {}

  getValue (key: string): string {
    return localStorage.getItem(key);
  }

  setValue (key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  removeStorageItem (key: string): void {
    localStorage.removeItem(key);
  }
}
