type LocalRecord = {
  tokens?: {
    access_token: string;
    refresh_token: string;
    access_expired_at: string;
    refresh_expired_at: string;
  } | null;
};

export const getLocalStorage = <T extends keyof LocalRecord>(key: T) =>
  JSON.parse(localStorage.getItem(key) as string) as LocalRecord[T];

export const setLocalStorage = <T extends keyof LocalRecord>(
  key: T,
  value: LocalRecord[T],
) => {
  if (value === undefined || value === null) {
    localStorage.removeItem(key);
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
