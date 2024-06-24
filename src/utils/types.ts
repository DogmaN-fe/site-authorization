// Тип ответа сервера на авторизацию
export interface IAnswer {
  token: string;
  id?: string;
}

// Тип сохранения лайка
export interface ILike {
  id: number;
  like: boolean;
}

// Тип данных работника
export interface IEmployeeData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

// Тип ответа сервера на получение карточек сотрудников
export interface IApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: IEmployeeData[];
}
