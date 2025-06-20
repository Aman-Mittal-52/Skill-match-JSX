import { Users, Shield, ShieldOff } from "lucide-react";

export default function AdminStats({ users }) {
  const totalUsers = users.length;
  const activeUsers = users.filter(u => !u.isBanned).length;
  const bannedUsers = users.filter(u => u.isBanned).length;
  const seekers = users.filter(u => u.role === 'seeker').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-card border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Users</p>
            <p className="text-2xl font-bold">{totalUsers}</p>
          </div>
          <Users className="h-8 w-8 text-primary" />
        </div>
      </div>
      <div className="bg-card border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Active Users</p>
            <p className="text-2xl font-bold text-green-600">{activeUsers}</p>
          </div>
          <Shield className="h-8 w-8 text-green-600" />
        </div>
      </div>
      <div className="bg-card border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Banned Users</p>
            <p className="text-2xl font-bold text-red-600">{bannedUsers}</p>
          </div>
          <ShieldOff className="h-8 w-8 text-red-600" />
        </div>
      </div>
      <div className="bg-card border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Seekers</p>
            <p className="text-2xl font-bold text-blue-600">{seekers}</p>
          </div>
          <Users className="h-8 w-8 text-blue-600" />
        </div>
      </div>
    </div>
  );
} 