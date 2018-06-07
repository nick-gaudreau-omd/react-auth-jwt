import User from "../models/User";

export interface IAuthFormProps {
  onSubmit: (e:any) => void;
  onChange: (e:any) => void;
  errors: any;
  user: User;
}