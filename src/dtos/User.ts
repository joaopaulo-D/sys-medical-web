export interface IUser {
  data: {
    id: string;
    email: string;
    role: string;
    discipline: string;
    instituition: string;
    created_at: any;
    uploads: IUpload
  }
}

export interface IUpload {
  [key: string]: {
    name: string;
    type: string;
    size: number;
    url: string;
    created_at: any;
  }
}

interface ICreatedAt {
  seconds: number,
  nanoseconds: number
}