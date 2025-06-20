import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BigLoader } from "@/components/ui/BigLoader";
import { 
  fetchAllUsers, 
  banUser, 
  unbanUser, 
  setFilters,
  optimisticallyBanUser,
  optimisticallyUnbanUser,
  selectAllUsers,
  selectAdminLoading,
  selectAdminError
} from "@/features/user/userSlice";

// Import components
import AdminHeader from "./AdminHeader";
import AdminFilters from "./AdminFilters";
import AdminStats from "./AdminStats";
import AdminUserGrid from "./AdminUserGrid";
import AdminDialogs from "./AdminDialogs";
import SuccessMessage from "./SuccessMessage";

export default function AdminUsers() {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const loading = useSelector(selectAdminLoading);
  const error = useSelector(selectAdminError);
  const filters = useSelector((state) => state.user.filters);

  // State for filters and search
  const [searchQuery, setSearchQuery] = useState(filters.searchQuery);
  const [selectedRole, setSelectedRole] = useState(filters.role);
  const [selectedStatus, setSelectedStatus] = useState(filters.status);
  
  // Dialog states
  const [banDialogOpen, setBanDialogOpen] = useState(false);
  const [unbanDialogOpen, setUnbanDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionInProgress, setActionInProgress] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch users on component mount
  useEffect(() => {
    console.log('AdminUsers component mounted, fetching users...');
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // Update filters in Redux store
  useEffect(() => {
    console.log('Filters updated:', { searchQuery, selectedRole, selectedStatus });
    dispatch(setFilters({
      searchQuery,
      role: selectedRole,
      status: selectedStatus
    }));
    // Clear success message when filters change
    setSuccessMessage('');
  }, [dispatch, searchQuery, selectedRole, selectedStatus]);

  // Filter users based on search and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (user.mobileNumber && user.mobileNumber.includes(searchQuery));
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    const matchesStatus = selectedStatus === "all" || 
                         (selectedStatus === "banned" && user.isBanned) ||
                         (selectedStatus === "active" && !user.isBanned);
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Debug logging
  console.log("Current filters:", { searchQuery, selectedRole, selectedStatus });
  console.log("Filtered users count:", filteredUsers.length);
  console.log("API Status:", loading);
  if (error) console.error("API Error:", error);

  // Handle user actions
  const handleViewDetails = (userId) => {
    const user = users.find(u => u._id === userId);
    setSelectedUser(user);
    setViewDialogOpen(true);
  };

  const handleBanUser = (userId) => {
    const user = users.find(u => u._id === userId);
    setSelectedUser(user);
    setBanDialogOpen(true);
  };

  const handleUnbanUser = (userId) => {
    const user = users.find(u => u._id === userId);
    setSelectedUser(user);
    setUnbanDialogOpen(true);
  };

  // Confirm actions
  const confirmBanUser = () => {
    if (selectedUser) {
      setActionInProgress(`ban-${selectedUser._id}`);
      // Optimistically update the UI immediately
      dispatch(optimisticallyBanUser(selectedUser._id));
      // Then make the API call
      dispatch(banUser(selectedUser._id))
        .then(() => {
          setSuccessMessage('User banned successfully');
          setTimeout(() => setSuccessMessage(''), 3000);
        })
        .catch((error) => {
          // Revert optimistic update on error
          dispatch(optimisticallyUnbanUser(selectedUser._id));
          console.error('Failed to ban user:', error);
        })
        .finally(() => {
          setActionInProgress(null);
        });
      setBanDialogOpen(false);
      setSelectedUser(null);
    }
  };

  const confirmUnbanUser = () => {
    if (selectedUser) {
      setActionInProgress(`unban-${selectedUser._id}`);
      // Optimistically update the UI immediately
      dispatch(optimisticallyUnbanUser(selectedUser._id));
      // Then make the API call
      dispatch(unbanUser(selectedUser._id))
        .then(() => {
          setSuccessMessage('User unbanned successfully');
          setTimeout(() => setSuccessMessage(''), 3000);
        })
        .catch((error) => {
          // Revert optimistic update on error
          dispatch(optimisticallyBanUser(selectedUser._id));
          console.error('Failed to unban user:', error);
        })
        .finally(() => {
          setActionInProgress(null);
        });
      setUnbanDialogOpen(false);
      setSelectedUser(null);
    }
  };

  if (loading) {
    return <BigLoader />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <h2 className="text-xl font-semibold">Error loading users</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AdminHeader />
      
      <AdminFilters 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />

      <AdminStats users={users} />

      <SuccessMessage message={successMessage} />

      <AdminUserGrid 
        filteredUsers={filteredUsers}
        onViewDetails={handleViewDetails}
        onBanUser={handleBanUser}
        onUnbanUser={handleUnbanUser}
        actionInProgress={actionInProgress}
      />

      <AdminDialogs 
        banDialogOpen={banDialogOpen}
        setBanDialogOpen={setBanDialogOpen}
        unbanDialogOpen={unbanDialogOpen}
        setUnbanDialogOpen={setUnbanDialogOpen}
        viewDialogOpen={viewDialogOpen}
        setViewDialogOpen={setViewDialogOpen}
        selectedUser={selectedUser}
        onConfirmBan={confirmBanUser}
        onConfirmUnban={confirmUnbanUser}
      />
    </div>
  );
} 