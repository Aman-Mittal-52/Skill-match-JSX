import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { BadgeHelp, Briefcase, FileCheck2, Mail, Plus, Settings, User, UserCog } from "lucide-react"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "@/features/auth/authSlice"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export function ProfileDropDown() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    console.log('Logging out user...'); // Debug log
    try {
      dispatch(logout());
      toast.success(`Logged out successfully`);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error); // Debug log
      toast.error('Failed to logout');
    }
  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="rounded-full dark:text-accent-foreground">
            <User className="w-4 h-4 mr-2" />
            <span className="text-sm max-w-[120px] truncate">{user?.name}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mr-5" align="start">
          <DropdownMenuLabel>
            <div className="flex flex-col gap-2">
              <div>Account</div>
              <div className="text-muted-foreground">
                {user?.email}
              </div>
            </div>

          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <UserCog /> Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            {
              user && user.role == 'seeker' ?
                <DropdownMenuItem onClick={() => navigate('/applications')}>
                  <FileCheck2 /> Applied
                </DropdownMenuItem>
                :(
                  <>
                  <DropdownMenuItem onClick={() => navigate('/jobs/post')}>
                  <Plus /> Post a job
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/jobs/posted')}>
                  <Briefcase /> Posted jobs
                </DropdownMenuItem>
                </>
                )
            }
            <DropdownMenuItem>
              <Settings /> Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem><BadgeHelp />Support</DropdownMenuItem>
          <DropdownMenuItem disabled>Github</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem>
              Log out
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to
            logout from your account?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleLogout}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
