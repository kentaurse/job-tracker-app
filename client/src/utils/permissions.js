/**
 * Check if a user has the required permission
 * @param {Object} user - The user object
 * @param {string} permission - The permission to check
 * @returns {boolean} - Whether the user has the permission
 */
export const checkPermission = (user, permission) => {
  // If no user or no permissions, deny access
  if (!user || !user.permissions) {
    return false;
  }

  // If user is admin, grant all permissions
  if (user.role === 'admin') {
    return true;
  }

  // Check if user has the specific permission
  return user.permissions.includes(permission);
};

/**
 * Get all permissions for a user
 * @param {Object} user - The user object
 * @returns {string[]} - Array of permission strings
 */
export const getUserPermissions = (user) => {
  return user?.permissions || [];
}; 