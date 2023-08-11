export type IDefaultResponse = {
  code: number;
  message: string;
};

export type IResponseFormat<K = null, V = null> = {
  response: K | null;
  error: V | null;
};
