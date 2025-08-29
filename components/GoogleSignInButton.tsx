import { FC, ReactNode } from 'react';
import { Button } from './ui/button';
import { signIn } from 'next-auth/react';

interface GoogleSignInButtonProps {
  children: ReactNode;
  callbackUrl?: string;
}

const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children, callbackUrl }) => {
  const loginWithGoogle = () => {
    signIn('google', callbackUrl ? { callbackUrl } : undefined);
  };

  return (
    <Button onClick={loginWithGoogle} className='w-full'>
      {children}
    </Button>
  );
};

export default GoogleSignInButton;