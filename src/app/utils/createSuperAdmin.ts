import { User } from "../modules/users/user.model";

const seedSuperAdmin = async () => {
  const password = "77777777"
  const superUser = {
    fullName: "Admin",
    email: "admin777@gmail.com",
    password: password,
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
