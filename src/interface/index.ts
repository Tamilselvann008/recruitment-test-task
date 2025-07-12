export interface IPrivateWrapperProps {
  auth: {
    isAuthenticated: boolean;
  };
}

export type User = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "User";
  avatarUrl?: string;
  status: "Active" | "Inactive";
};
