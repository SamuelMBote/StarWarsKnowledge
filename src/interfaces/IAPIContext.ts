export interface IAPIContext {
  API_ROOT_URL: string;
  ROOT_RESOURCES: {
    loading: boolean;
    error: string | null;
    data: any;
    request: Function | null;
  };
  FETCH_RESOURCE_LIST: (
    slug_resource: string,
    page?: string,
  ) => {
    url: string;
    options: {
      method: string;
      headers: {
        'Content-Type': string;
      };
    };
  };
  FETCH_RESOURCE: (url: string) => {
    url: string;
    options: {
      method: string;
      headers: {
        'Content-Type': string;
      };
    };
  };
}
