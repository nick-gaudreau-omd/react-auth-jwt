import User from "../models/User";

export default interface IAuthContainerState {
  errors: any;
  successMessage?:string;
  user: User;
}