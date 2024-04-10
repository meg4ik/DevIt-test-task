'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/router';

const AdminPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Проверка на аутентификацию пользователя
    const isAuthenticated = false // Реализуйте проверку аутентификации здесь

    // Если пользователь не аутентифицирован, перенаправляем его на страницу аутентификации
    if (!isAuthenticated) {
      router.push('/login'); // Перенаправление на страницу аутентификации
    }
  }, []);


  return (
    <div>
      <h1>Admin Page</h1>
      {/* Добавьте содержимое страницы администратора здесь */}
    </div>
  );
};

export default AdminPage;
