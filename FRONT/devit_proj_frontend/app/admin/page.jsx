// pages/admin.js

import RequireAuthentication from '../components/RequireAuthentication';
import AdminArticleList from '../components/AdminArticleList';

const AdminPage = () => {
  return (
    <RequireAuthentication>
    <div className="container mx-auto px-4 py-8">
      <AdminArticleList />
    </div>
    </RequireAuthentication>
  );
};

export default AdminPage;
