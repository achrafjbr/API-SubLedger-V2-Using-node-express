// utils/utilities.js
const getHeaderToken = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null; // الحماية ضد undefined
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") return null;
  return parts[1];
};

module.exports = { getHeaderToken };
