function hasPermissions(user, permissionsNeeded) {
  const matchedPermissions = user.permissions.filter(permissionTheyHave =>
    permissionsNeeded.includes(permissionTheyHave)
  );

  if (!matchedPermissions.length) {
    throw new Error(`You dont have sufficient permissions: ${permissionsNeeded}. You Have: ${user.permissions}`);
  }
}

exports.hasPermissions = hasPermissions;
