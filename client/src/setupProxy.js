const { createProxyMiddleware } = require("http-proxy-middleware");
const url =
  process.env.NODE_ENV == "production"
    ? "https://serverless2-liart.vercel.app"
    : "http://localhost:5500";

module.exports = function (app) {
  app.use(
    "/signup",
    createProxyMiddleware({
      target: url,
      changeOrigin: true,
    })
  );
  app.use(
    "/signin",
    createProxyMiddleware({
      target: url,
      changeOrigin: true,
    })
  );
  app.use(
    "/createtodo",
    createProxyMiddleware({
      target: url,
      changeOrigin: true,
    })
  );
  app.use(
    "/gettodos",
    createProxyMiddleware({
      target: url,
      changeOrigin: true,
    })
  );
  app.use(
    "/remove/:id",
    createProxyMiddleware({
      target: url,
      changeOrigin: true,
    })
  );
};
