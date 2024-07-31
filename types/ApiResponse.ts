export interface APIBody {
  data: {
    pagination: {
      current_page: number;
      last_page: number;
      limit: number;
      total: number;
    };
    record: Array<any>;
  };
}