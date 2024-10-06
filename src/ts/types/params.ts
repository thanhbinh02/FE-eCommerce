export type PageParams = Partial<{
  page: number;
  page_size: number;
}>;

export type NoLogsParams = Partial<{
  noLogs: true;
}>;

export type GetFullParams = {
  getFull?: boolean;
};

export type UpdateTimeParams = Partial<{
  updatedDateTo: string;
  updatedDateFrom: string;
}>;

export type CreateRangeParams = Partial<{
  create_at_from: string;
  create_at_to: string;
}>;

export type EditRangeParams = Partial<{
  edited_at_from: string;
  edited_at_to: string;
}>;

export type SortParam = Partial<{
  order_by: string;
}>;
