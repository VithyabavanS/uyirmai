/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TINA_CLIENT_ID: string
  readonly VITE_TINA_TOKEN: string
  readonly VITE_TINA_PUBLIC_IS_LOCAL: string
  readonly VERCEL_GIT_COMMIT_REF?: string
  readonly GITHUB_BRANCH?: string
  readonly HEAD?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
