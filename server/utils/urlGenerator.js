// utils/urlGenerator.js
exports.generateResetUrl = (uniqueToken) => {
    return `${process.env.FRONTEND_BASE_URL}/reset-password?token=${uniqueToken}`;
  };
  