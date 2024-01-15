import User from "../models/user.model";

export const userExists = async (email: string) : Promise<boolean> => {
    const user = await User.findOne({email:email});
    if(user){
        return true;
    }
    return false;
}