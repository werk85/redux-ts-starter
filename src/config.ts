import * as t from 'io-ts'

export const Environment = t.keyof(
  {
    development: null,
    stage: null,
    production: null
  },
  'Environment'
)
export type Environment = t.TypeOf<typeof Environment>

export const Platform = t.keyof(
  {
    browser: null,
    ios: null,
    android: null
  },
  'Platform'
)
export type Platform = t.TypeOf<typeof Platform>

export const Config = t.type(
  {
    environment: Environment,
    platform: Platform,
    title: t.string,
    version: t.string
  },
  'Config'
)
export interface Config extends t.TypeOf<typeof Config> {}
