import config from "../config";
import bcrypt from 'bcrypt';
import { User } from "../modules/users/user.model";

const seedSuperAdmin = async () => {
  const password = "admin777"
  const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds))

  const superUser = {
    fullName: "Admin",
    email: "superadmin777@gmail.com",
    password: hashedPassword,
    role: "admin",
    status: "in-progress",
    isDeleted: false,
    credits: 11000000,
    isActive: true
  }
  const isSuperAdminExits = await User.findOne({ role: "admin" });

  if (!isSuperAdminExits) {
    await User.create(superUser);
  }
};

export default seedSuperAdmin;
