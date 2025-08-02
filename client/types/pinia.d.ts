import 'pinia'

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    persist?: boolean | {
      storage?: string
      cookieOptions?: {
        sameSite?: string
        secure?: boolean
        httpOnly?: boolean
      }
    }
  }
} 