import { File, ExternalLink, Mail, Phone, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function AdminDialogs({
  banDialogOpen,
  setBanDialogOpen,
  unbanDialogOpen,
  setUnbanDialogOpen,
  viewDialogOpen,
  setViewDialogOpen,
  selectedUser,
  onConfirmBan,
  onConfirmUnban
}) {
  // Helper functions
  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'recruiter':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'seeker':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (isBanned) => {
    return isBanned 
      ? 'bg-red-100 text-red-800 border-red-200' 
      : 'bg-green-100 text-green-800 border-green-200';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      {/* Ban User Dialog */}
      <Dialog open={banDialogOpen} onOpenChange={setBanDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ban User</DialogTitle>
            <DialogDescription>
              Are you sure you want to ban {selectedUser?.name}? This will prevent them from accessing the platform.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBanDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={onConfirmBan} variant="destructive">
              Ban User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Unban User Dialog */}
      <Dialog open={unbanDialogOpen} onOpenChange={setUnbanDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unban User</DialogTitle>
            <DialogDescription>
              Are you sure you want to unban {selectedUser?.name}? This will restore their access to the platform.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUnbanDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={onConfirmUnban} variant="secondary">
              Unban User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View User Details Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              View detailed information about {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-6">
              {/* User Header */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-muted-foreground/10 rounded-lg">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="" alt={selectedUser.name} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                    {getInitials(selectedUser.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className={`${getRoleColor(selectedUser.role)} border`}>
                      {selectedUser.role}
                    </Badge>
                    <Badge className={`${getStatusColor(selectedUser.isBanned)} border`}>
                      {selectedUser.isBanned ? 'Banned' : 'Active'}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* User Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Email:</span>
                    <span>{selectedUser.email}</span>
                  </div>
                  {selectedUser.mobileNumber && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Phone:</span>
                      <span>{selectedUser.mobileNumber}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Joined:</span>
                    <span>{formatDate(selectedUser.createdAt)}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">User ID:</span>
                    <span className="font-mono text-xs">{selectedUser._id}</span>
                  </div>
                </div>
              </div>

              {/* Resume Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold">Resume Files</h4>
                  <span className="text-sm text-muted-foreground">
                    {selectedUser.resumeUrls?.length || 0} resume(s) uploaded
                  </span>
                </div>
                
                {selectedUser.resumeUrls && selectedUser.resumeUrls.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedUser.resumeUrls.map((url, index) => (
                      <div key={index} className="flex items-center bg-background border rounded-lg px-4 py-3 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="bg-primary/10 border border-primary/20 rounded-lg p-2">
                            <File className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">
                              Resume {selectedUser.resumeUrls.length > 1 ? index + 1 : ''}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {url.split('/').pop() || `Resume ${index + 1}`}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(url, '_blank')}
                          className="flex items-center space-x-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                          <span>View</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <File className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">No resume files uploaded</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
} 