export const getConversationName = (members, user) => {
  const reciever = members.find((member) => member._id !== user._id);
  return reciever ? reciever.fullName : user.fullName;
};

export const getMember = (members, user) => {
  const member = members.find((member) => member._id !== user._id);
  return member || members[0];
};
