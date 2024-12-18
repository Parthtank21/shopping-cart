export interface IResponse<T> {
  status: "success" | "failed";
  message: "string";
  data: T;
  error: unknown;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalProducts: number;
    limit: number;
  };
}
