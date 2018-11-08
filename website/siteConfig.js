/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config.html for all the possible
// site configuration options.

/* List of projects/orgs using your project for the users page */
/*
const users = [
  {
    caption: 'User1',
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/salak.png'.
    image: '/img/salak.png',
    infoLink: 'https://www.facebook.com',
    pinned: true,
  },
];
*/
const users = []

const repoUrl = 'https://github.com/salakjs/salak';

const siteConfig = {
  title: 'Salak' /* title for your website */,
  tagline: 'Build Node.js applications gracefully.',
  url: 'https://salakjs.github.io' /* your website url */,
  baseUrl: '/docs/' /* base url for your project */,
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  projectName: 'docs',
  organizationName: 'salakjs',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  repoUrl,

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {doc: 'introduction', label: 'Docs'},
    // {page: 'help', label: 'Help'},
    {languages: true},
    {href: repoUrl, label: 'GitHub'}
  ],

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: 'img/salak.png',
  footerIcon: 'img/salak.png',
  favicon: 'img/favicon.png',

  /* colors for website */
  colors: {
    primaryColor: '#6190e8',
    secondaryColor: '#5787e2',
  },

  /* custom fonts for website */
  /*fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },*/

  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright:
    'Copyright © ' +
    new Date().getFullYear() +
    ' 凹凸实验室',

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags
  scripts: ['https://buttons.github.io/buttons.js'],

  /* On page navigation for the current documentation page */
  onPageNav: 'separate',

  /* Open Graph and Twitter card images */
  ogImage: 'img/salak.png',
  twitterImage: 'img/salak.png',

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  //   repoUrl: 'https://github.com/facebook/test-site',
};

module.exports = siteConfig;
