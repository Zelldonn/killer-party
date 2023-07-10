export type Player = {
    name: string,
    email?: string
}

export type Action = {
    description: string
}

export type Link = {
    player: Player,
    target: Player,
    action: Action 
}