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
import { User } from "lucide-react"
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-full dark:text-accent-foreground">
          <User className="w-4 h-4 mr-2" />
          <span className="text-sm max-w-[120px] truncate">{user?.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-5" align="start">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator/>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          {
            user && user.role == 'seeker' ?
              null
              :
              <DropdownMenuItem>
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
          }
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem disabled>Github</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Log out</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className='flex flex-col gap-1'>
              <DropdownMenuItem className='bg-red-500 text-white flex justify-center' onClick={handleLogout}>Confirm</DropdownMenuItem>
              <DropdownMenuItem className='flex justify-center'>Cancel</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
