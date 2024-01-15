import User from "../models/user.model";

export const userExists = async (phoneNumber: string | number) : Promise<boolean> => {
    const user = await User.findOne({phoneNumber:phoneNumber});
    if(user){
        return true;
    }
    return false;
}