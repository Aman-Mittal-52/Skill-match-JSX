import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { Button } from './button';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  FileText, 
  Shield, 
  ShieldOff,
  Eye,
  Loader2
} from 'lucide-react';

export function UserCard({ user, onViewDetails, onBanUser, onUnbanUser, actionInProgress }) {
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
    <Card className="flex flex-col justify-between hover:shadow-lg transition-shadow duration-200 cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src="" alt={user.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg font-semibold">{user.name}</CardTitle>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-3 w-3" />
                <span>{user.email}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-1">
            <Badge className={`${getRoleColor(user.role)} border`}>
              {user.role}
            </Badge>
            <Badge className={`${getStatusColor(user.isBanned)} border text-xs`}>
              {user.isBanned ? 'Banned' : 'Active'}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Contact Information */}
        <div className="space-y-2">
          {user.mobileNumber && (
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{user.mobileNumber}</span>
            </div>
          )}
          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Joined: {formatDate(user.createdAt)}</span>
          </div>
        </div>

        {/* Resume Count */}
        <div className="flex items-center space-x-2 text-sm">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span>{user.resumeUrls?.length || 0} resume(s) uploaded</span>
        </div>

      
      </CardContent>
      <CardFooter>
          {/* Action Buttons */}
          <div className="flex w-full items-center justify-between pt-2 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(user._id)}
            className="flex items-center space-x-1"
          >
            <Eye className="h-3 w-3" />
            <span>View</span>
          </Button>

          <div className="flex items-center space-x-1">
            {user.isBanned ? (
              <Button
                key={`unban-${user._id}`}
                variant="outline"
                size="sm"
                onClick={() => onUnbanUser(user._id)}
                disabled={actionInProgress === `unban-${user._id}`}
                className="flex items-center space-x-1 text-green-600 hover:text-green-700"
              >
                {actionInProgress === `unban-${user._id}` ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <Shield className="h-3 w-3" />
                )}
                <span>{actionInProgress === `unban-${user._id}` ? 'Unbanning...' : 'Unban'}</span>
              </Button>
            ) : (
              <Button
                key={`ban-${user._id}`}
                variant="outline"
                size="sm"
                onClick={() => onBanUser(user._id)}
                disabled={actionInProgress === `ban-${user._id}`}
                className="flex items-center space-x-1 text-orange-600 hover:text-orange-700"
              >
                {actionInProgress === `ban-${user._id}` ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <ShieldOff className="h-3 w-3" />
                )}
                <span>{actionInProgress === `ban-${user._id}` ? 'Banning...' : 'Ban'}</span>
              </Button>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
} 