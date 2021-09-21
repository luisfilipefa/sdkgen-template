export interface DBUser {
  id: string;
  name: string;
  email: string;
  password: string | null;
  createdAt: Date;
  updatedAt: Date;
}
