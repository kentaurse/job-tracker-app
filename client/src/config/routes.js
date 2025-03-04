import { lazy } from 'react';

const Dashboard = lazy(() => import('@pages/dashboard/Dashboard'));
const Analytics = lazy(() => import('@pages/dashboard/Analytics'));
const UserManagement = lazy(() => import('@pages/users/UserManagement'));
const UserList = lazy(() => import('@pages/users/UserList'));
const Tables = lazy(() => import('@pages/game/Tables'));
const Deposits = lazy(() => import('@pages/finance/Deposits'));
const Settings = lazy(() => import('@pages/settings/Settings'));
const History = lazy(() => import('@pages/game/History'));
const Contact = lazy(() => import('@pages/contact/Contact'));
const Profile = lazy(() => import('@pages/settings/Profile'));
const AccountSettings = lazy(() => import('@pages/settings/AccountSettings'));
const Lobby = lazy(() => import('@pages/lobby/Lobby'));
const Landing = lazy(() => import('@pages/landing/Landing'));

export const routes = [
  {
    path: '/',
    component: Landing,
    permission: 'view_landing',
    name: 'Landing',
  },
  {
    path: '/lobby',
    component: Lobby,
    permission: 'view_lobby',
    name: 'Lobby',
  },
  {
    path: '/dashboard',
    component: Dashboard,
    permission: 'view_dashboard',
    icon: 'DashboardOutlined',
    name: 'Dashboard',
  },
  {
    path: '/analytics',
    component: Analytics,
    permission: 'view_analytics',
    icon: 'AreaChartOutlined',
    name: 'Analytics',
  },
  {
    path: '/users',
    component: UserManagement,
    permission: 'manage_users',
    icon: 'UserOutlined',
    name: 'Users',
    children: [
      {
        path: '/users/list',
        component: UserList,
        permission: 'view_users',
        name: 'User List',
      }
    ]
  },
  {
    path: '/game/tables',
    component: Tables,
    permission: 'view_tables',
    icon: 'TableOutlined',
    name: 'Game Tables',
  },
  {
    path: '/game/history',
    component: History,
    permission: 'view_history',
    icon: 'HistoryOutlined',
    name: 'History',
  },
  {
    path: '/finance/deposits',
    component: Deposits,
    permission: 'view_deposits',
    icon: 'BankOutlined',
    name: 'Deposits',
  },
  {
    path: '/settings/profile',
    component: Profile,
    permission: 'view_profile',
    icon: 'UserOutlined',
    name: 'My Profile',
  },
  {
    path: '/settings/account',
    component: AccountSettings,
    permission: 'view_account_settings',
    icon: 'SettingOutlined',
    name: 'Account Settings',
  },
  {
    path: '/settings',
    component: Settings,
    permission: 'view_settings',
    icon: 'SettingOutlined',
    name: 'Settings',
  },
  {
    path: '/contact',
    component: Contact,
    permission: 'view_contact',
    icon: 'MessageOutlined',
    name: 'Contact',
  },
]; 