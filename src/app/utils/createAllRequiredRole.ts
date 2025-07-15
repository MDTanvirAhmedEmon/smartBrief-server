import { User } from "../modules/users/user.model";

export const seedSuperAdmin = async () => {
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

export const seedEditor = async () => {
  const password = "55555555"
  const superUser = {
    fullName: "Editor",
    email: "editor@gmail.com",
    password: password,
    role: "editor",
    status: "in-progress",
    isDeleted: false,
    credits: 0,
    isActive: true
  }
  const isSuperAdminExits = await User.findOne({ role: "editor" });

  if (!isSuperAdminExits) {
    await User.create(superUser);
  }
};

export const seedReviewer = async () => {
  const password = "33333333"
  const superUser = {
    fullName: "Reviewer",
    email: "reviewer@gmail.com",
    password: password,
    role: "reviewer",
    status: "in-progress",
    isDeleted: false,
    credits: 0,
    isActive: true
  }
  const isSuperAdminExits = await User.findOne({ role: "reviewer" });

  if (!isSuperAdminExits) {
    await User.create(superUser);
  }
};

