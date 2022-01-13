module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '4203d6fb1e92953ec7e555df79793ed1'),
  },
});
