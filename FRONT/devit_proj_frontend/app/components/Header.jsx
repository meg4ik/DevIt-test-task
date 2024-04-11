import Link from 'next/link';
import RequireAuthentication from './RequireAuthentication';

const Header = () => {
  return (
    <header className='header'>
      <div className='container'>
        <div className='logo'>
          <Link href='/'>Article Management</Link>
        </div>
        <div className='links'>
          <RequireAuthentication>
            <Link href='/admin'>Admin</Link>
            <Link href='/logout'>Logout</Link>
          </RequireAuthentication>
          <RequireAuthentication invert={true}>
            <Link href='/login'>Login</Link>
          </RequireAuthentication>
        </div>
      </div>
    </header>
  );
};

export default Header;
