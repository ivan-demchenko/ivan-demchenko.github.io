require("dotenv").config();

module.exports = {
  siteMetadata: {
    siteUrl: "https://raqystyle.github.io",
    title: "Ivan Demchenko's space",
    social: {
      twitter: "raqystyle",
      github: "raqystyle",
      linkedin: "ivandemchenko",
    },
  },
  plugins: [
    "gatsby-plugin-image",
    {
      resolve: "gatsby-source-pocket",  
      options: {
        consumerKey: process.env.POCKET_CONSUMER_KEY,
        accessToken: process.env.POCKET_ACCESS_TOKEN,
        weeksOfHistory: 52,
        apiMaxRecordsToReturn: 100,
        getCurrentWeekOnly: "n",
        tagFilter: true,
        tagFilterString: "for-website",
      },
    },
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              noInlineHighlight: true,
            },
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              backgroundColor: "transparent",
              maxWidth: 590,
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-postcss",
      options: {
        cssLoaderOptions: {
          exportLocalsConvention: false,
          namedExport: false,
        },
      },
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-58254906-1",
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Ivan Demchenko's blog",
        short_name: "Ivan Demchenko",
        description: "This is a personal website of Ivan Demchenko",
        lang: "en",
        start_url: `/`,
        icon: "src/images/icon.png",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog",
        path: "./blog/",
      },
      __key: "blog",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
  ],
};
