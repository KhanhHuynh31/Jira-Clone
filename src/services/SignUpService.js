import { baseService } from "./baseService";

export class SignUpService extends baseService{

    signUp = (signUpData) => {
        return this.post(`Users/signup`, signUpData)
     }
   


}
export const signUpService = new SignUpService()