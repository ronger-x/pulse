// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui-pro',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@vueuse/nuxt',
    'nuxt-og-image',
    '@sidebase/nuxt-auth'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  content: {
    preview: {
      api: 'https://api.nuxt.studio'
    }
  },

  ui: {
    fonts: false
  },

  runtimeConfig: {
    baseURL: 'https://rymcu.com/api/auth'
  },

  routeRules: {
    '/docs': { redirect: '/docs/getting-started', prerender: false }
  },

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2024-07-11',

  nitro: {
    prerender: {
      routes: [
        '/',
        '/docs'
      ],
      crawlLinks: true
    }
  },

  auth: {
    baseURL: 'https://rymcu.com/api/auth',
    sessionRefresh: {
      enablePeriodically: 14 * 60 * 1000, // 14 min
      enableOnWindowFocus: false
    },
    provider: {
      type: 'local',
      pages: {
        login: '/auth/login'
      },
      endpoints: {
        signIn: { path: '/login', method: 'post' },
        signOut: { path: '/logout', method: 'post' },
        signUp: { path: '/register', method: 'post' },
        getSession: { path: '/user', method: 'get' }
      },
      token: {
        signInResponseTokenPointer: '/data/token',
        maxAgeInSeconds: 60 * 15, // 15 min
        sameSiteAttribute: 'lax'
      },
      refresh: {
        isEnabled: true,
        endpoint: {
          path: '/refresh-token', method: 'post'
        },
        refreshOnlyToken: false,
        token: {
          signInResponseRefreshTokenPointer: '/data/refreshToken',
          maxAgeInSeconds: 60 * 120, // 120 min
          refreshRequestTokenPointer: '/refreshToken'
        }
      },
      session: {
        dataResponsePointer: '/data/user',
        dataType: {
          account: 'string',
          nickname: 'string',
          avatar: 'string',
          permissions: 'string[]',
          roles: 'string[]'
        }
      }
    },
    globalAppMiddleware: {
      isEnabled: false
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
