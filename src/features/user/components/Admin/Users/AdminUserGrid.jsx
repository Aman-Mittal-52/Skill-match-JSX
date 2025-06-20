import { Users } from "lucide-react";
import { UserCard } from "@/components/ui/UserCard";

export default function AdminUserGrid({ 
  filteredUsers, 
  onViewDetails, 
  onBanUser, 
  onUnbanUser, 
  actionInProgress 
}) {
  if (filteredUsers.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">No users found</h3>
        <p className="text-gray-600">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredUsers.map((user) => (
        <UserCard
          key={user._id}
          user={user}
          onViewDetails={onViewDetails}
          onBanUser={onBanUser}
          onUnbanUser={onUnbanUser}
          actionInProgress={actionInProgress}
        />
      ))}
    </div>
  );
} 