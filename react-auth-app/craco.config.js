module.exports = {
    style: {
      postcss: {
        plugins: [require("tailwindcss"), require("autoprefixer")],
      },
    },
    webpack: {
      configure: (config, {env, paths}) => {
        // ... your existing webpack config
        return config;
      },
    },
  };
