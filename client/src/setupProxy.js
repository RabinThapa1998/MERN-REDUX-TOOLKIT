const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/signup",
    createProxyMiddleware({
      target: "http://localhost:5500",
      changeOrigin: true,
    })
  );
  app.use(
    "/signin",
    createProxyMiddleware({
      target: "http://localhost:5500",
      changeOrigin: true,
    })
  );
  app.use(
    "/createtodo",
    createProxyMiddleware({
      target: "http://localhost:5500",
      changeOrigin: true,
    })
  );
  app.use(
    "/gettodos",
    createProxyMiddleware({
      target: "http://localhost:5500",
      changeOrigin: true,
    })
  );
  app.use(
    "/remove/:id",
    createProxyMiddleware({
      target: "http://localhost:5500",
      changeOrigin: true,
    })
  );
};
