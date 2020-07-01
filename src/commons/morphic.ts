import * as M from '@morphic-ts/batteries/lib/summoner-BASTJ'

export interface Env {}
export const { summon, tagged } = M.summonFor<Env>({})
export const AsOpaque = M.AsOpaque
