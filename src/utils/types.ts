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

// Тип данных формы
export interface IFormData {
  email: string;
  password: string;
  name?: string;
  duplicatePassword?: string;
}

// Тип данных ошибок в форме
export interface IFormErrorMessage {
  emailErrorMessage: string;
  passwordErrorMessage: string;
  nameErrorMessage?: string;
}
