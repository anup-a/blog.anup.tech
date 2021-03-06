/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: "Personal Blog",
    description: "Anup's personal blog",
    siteTitle: `uxie.blog`,
    siteTitleAlt: `Anup Aglawe's Blog`,
    siteHeadline: `Anup Aglawe's Blog`,
    siteUrl: `https://blog.anup.tech`,
    siteDescription: `Anup Aglawe's personal blog`,
    siteLanguage: `en`,
    siteImage: `/banner.jpg`,
    author: `Anup Aglawe`,
  },
  plugins: [
    {
      //  Fetch blog markdown files and create file nodes
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog",
        path: `${__dirname}/content/blog/`,
      },
    },
    {
      // Add custom fonts to gatbsy
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [`https://fonts.gstatic.com`],
        interval: 300,
        timeout: 30000,
        web: [
          {
            name: `IBM Plex Sans`,
            file: `https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap`,
          },
          {
            name: `Poppins`,
            file: `https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;800&display=swap`,
          },
        ],
      },
    },
    // transform markdown file nodes into RemarkNodes in gatsby datalayer
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 960,
              quality: 90,
              linkImagesToOriginal: false,
              backgroundColor: `transparent`,
            },
          },
        ],
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 960,
              quality: 90,
              linkImagesToOriginal: false,
              backgroundColor: `transparent`,
            },
          },
        ],
      },
    },
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-theme-ui`,
  ],
}
