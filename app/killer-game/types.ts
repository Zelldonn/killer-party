export type Player = {
    name: string,
    role?: "vip" | "bodyguard",
    target: string
    action: Action
    word?: string
}

export type Action = {
    description: string,
    hint?: string
} 

export type Binome = string[]