import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'INTROSERV Documentation',
  tagline: 'Docs',
  favicon: 'img/favicon.ico',

  url: 'https://docs.introserv.com',
  baseUrl: '/',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru', 'uk', 'sl', 'de', 'es', 'it', 'pl', 'tr'],
    localeConfigs: {
      en: {
        htmlLang: 'en',
        label: 'English',
      },
      ru: {
        htmlLang: 'ru',
        label: 'Русский',
      },
      uk: {
        htmlLang: 'uk',
        label: 'Українська',
      },
      sl: {
        htmlLang: 'sl',
        label: 'Slovenščina',
      },
      de: {
        htmlLang: 'de',
        label: 'Deutsch',
      },
      es: {
        htmlLang: 'es',
        label: 'Español',
      },
      it: {
        htmlLang: 'it',
        label: 'Italiano',
      },
      pl: {
        htmlLang: 'pl',
        label: 'Polski',
      },
      tr: {
        htmlLang: 'tr',
        label: 'Türkçe',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    'plugin-image-zoom',
  ],

  themeConfig: {
    // You can also add a language to the "announcement bar" if needed
    // announcementBar: {
    //   id: 'support_us',
    //   content: 'We are looking to revamp our docs, please fill <a target="_blank" rel="noopener noreferrer" href="#">this survey</a>',
    //   backgroundColor: '#fafbfc',
    //   textColor: '#091E42',
    //   isCloseable: false,
    // },
    
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'INTROSERV',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/facebook/docusaurus',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Documentation',
              to: '/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;