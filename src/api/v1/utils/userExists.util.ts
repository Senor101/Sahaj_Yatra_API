import { BusOwner } from '../models/bus.model'
import User from '../models/user.model'

export const userExists = async (
  phoneNumber: string | number,
): Promise<boolean> => {
  const user = Promise.all([
    await User.findOne({ phoneNumber: phoneNumber }),
    await BusOwner.findOne({ phoneNumber: phoneNumber }),
  ])
  if (await user) {
    return true
  }
  return false
}
