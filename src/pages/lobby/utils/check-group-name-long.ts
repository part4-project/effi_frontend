export const checkGroupNameLong = (groupName: string) => {
  return groupName.length > 6 ? 'long' : 'short';
};
