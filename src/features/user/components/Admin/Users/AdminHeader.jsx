import { Users } from "lucide-react";

export default function AdminHeader() {
  return (
    <div className="mb-8">
      <div className="flex items-center space-x-3 mb-4">
        <Users className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">User Management</h1>
      </div>
      <p className="text-gray-600">Manage all users, their roles, and account status</p>
    </div>
  );
} 