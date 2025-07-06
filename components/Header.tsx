// app/components/Header.tsx
import Image from 'next/image';

const Header = () => {
  return (
    <header className="flex items-center justify-between py-8 px-4 sm:px-16 bg-background">
      {/* Left Camera */}
      <div className="hidden md:block">
        <Image src="/camera.png" alt="Security Camera" width={150} height={100} style={{objectFit: 'contain'}} />
      </div>

      {/* Logo and Tagline */}
      <div className="flex flex-col items-center">
        <div className="text-5xl font-bold text-amber-500 tracking-wider">
          llp
        </div>
        <p className="text-muted-foreground mt-2 text-center">
          Tiên phong phân phối thiết bị công nghệ
        </p>
      </div>

      {/* Right Camera */}
      <div className="hidden md:block">
        <Image src="/camera.png" alt="Security Camera" width={150} height={100} style={{objectFit: 'contain'}} />
      </div>
    </header>
  );
};

export default Header;