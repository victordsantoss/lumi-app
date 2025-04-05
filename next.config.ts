const nextConfig = {
  devIndicators: {
    buildActivity: false,
    autoPrerender: false,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    });
    return config;
  },
};

module.exports = nextConfig;
