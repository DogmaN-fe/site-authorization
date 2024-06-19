// Тип ответа сервера
export interface IAnswer {
  token: string;
  id?: string;
}

// Тип сохранения лайка
export interface ILiked {
  id: number;
  liked: boolean;
}

// Тип данных работника
export interface IEmployeeData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

// Тип ответа сервера
export interface IApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: IEmployeeData[];
}
