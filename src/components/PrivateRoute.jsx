import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const accessToken = localStorage.getItem('accessToken'); // Kiểm tra token từ localStorage

  // Nếu không có token, điều hướng về trang login
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  // Nếu có token, hiển thị component con (Outlet)
  return <Outlet />;
};

export default PrivateRoute;
