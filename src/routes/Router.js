import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import AuthGuard from 'src/views/authentication/auth/AuthGuard';
import SystemManagmentDetails from 'src/views/systemmanagement/SystemManagmentDetails';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')));
const BesiAdminManagement = Loadable(
  lazy(() => import('../views/besiadminmanagement/BesiAdminManagement')),
);
const AddBesiAdminManagement = Loadable(
  lazy(() => import('../views/besiadminmanagement/AddBesiAdminManagement')),
);
const SystemManagement = Loadable(lazy(() => import('../views/systemmanagement/SystemManagement')));
const AuthorizedServicePartner = Loadable(
  lazy(() => import('../views/authorizedservicepartner/AuthorizedServicePartner')),
);
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const AuthorizationError = Loadable(
  lazy(() => import('../views/authentication/AuthorizationError')),
);
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const ForgetPassword = Loadable(lazy(() => import('../views/authentication/ForgetPassword')));
const OtpConfirmation = Loadable(lazy(() => import('../views/authentication/OtpConfirmation')));
const ResetPassword = Loadable(lazy(() => import('../views/authentication/ResetPassword')));
const AddSystemPage = Loadable(lazy(() => import('../views/systemmanagement/AddSystemPage')));
const SystemManagmentBulkUpload = Loadable(
  lazy(() => import('../views/systemmanagement/SystemManagmentBulkUpload')),
);
const ServicePartnerBulkUpload = Loadable(
  lazy(() => import('../views/authorizedservicepartner/ServicePartnerBulkUpload')),
);

const AuthorizedServicePartnerPage = Loadable(
  lazy(() => import('../views/authorizedservicepartner/AuthorizedServicePartnerPage')),
);
// const TermsAndConditions = Loadable(
//   lazy(() => import('../views/termsandconditions/TermsAndConditions')),
// );
const TechnicalData = Loadable(lazy(() => import('../views/technicaldata/TechnicalData')));
const Settings = Loadable(lazy(() => import('../views/settings/Settings')));

const Router = [
  {
    path: '/',
    element: (
      <AuthGuard>
        <FullLayout />
      </AuthGuard>
    ),
    children: [
      { path: '/', element: <Navigate to="/admin-management" /> },
      { path: '/dashboard', exact: true, element: <Dashboard /> },
      { path: '/admin-management', exact: true, element: <BesiAdminManagement /> },
      { path: '/admin-management/add-admin', element: <AddBesiAdminManagement /> },
      { path: '/admin-management/edit-admin/:id', element: <AddBesiAdminManagement /> },
      { path: '/system-managment', exact: true, element: <SystemManagement /> },
      { path: '/system-managment/add-system', element: <AddSystemPage /> },
      { path: '/system-managment/edit-system/:id', element: <AddSystemPage /> },
      { path: '/system-managment/bulk-upload', element: <SystemManagmentBulkUpload /> },
      { path: '/system-managment/:id', element: <SystemManagmentDetails /> },
      { path: '/service-partner', exact: true, element: <AuthorizedServicePartner /> },
      { path: '/service-partner/bulk-upload', element: <ServicePartnerBulkUpload /> },
      { path: '/service-partner/edit-partner/:id', element: <AuthorizedServicePartnerPage /> },
      {
        path: '/service-partner/add-service-partner',
        exact: true,
        element: <AuthorizedServicePartnerPage />,
      },
      { path: '/technical-data', exact: true, element: <TechnicalData /> },
      { path: '/settings', exact: true, element: <Settings /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/forgetpassword', element: <ForgetPassword /> },
      { path: '/auth/otpconfirmation', element: <OtpConfirmation /> },
      { path: '/auth/resetpassword', element: <ResetPassword /> },
    ],
  },
  { path: '*', element: <Error /> },
  {
    path: '/unauthorized',
    element: (
      <AuthGuard>
        <AuthorizationError />
      </AuthGuard>
    ),
  },
];

export default Router;
