// pages/admin.js

import RequireAuthentication from '../components/RequireAuthentication';

const AdminPage = () => {
  return (
    <RequireAuthentication>
      <div>
        <h1>Admin Page</h1>
        {/* Другое содержимое страницы администратора */}
      </div>
    </RequireAuthentication>
  );
};

export default AdminPage;
