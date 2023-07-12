import actions from "./data/actions";
import { Action, Link, Player } from "./types";

export class KillerGame {
    private players: Player[] = []
    private chain: Link[] = []
    private actions: Action[] = []
    /**
     * addPlayer
     */
    public addPlayer(player: Player) {
        this.players.push(player)
    }

    /**
     * removePlayer
     */
    public removePlayerByIndex(index: number) {
        const removedPlayer = this.players.splice(index, 1)
        console.log(`Player removed : ${removedPlayer}`)
    }

    /**
     * editPlayer
     */
    public editPlayerByIndex(index: number, newPlayer: Player) {
        const editedPlayer = this.players[index] = newPlayer
        console.log(`Player removed : ${editedPlayer}`)
    }

    /**
     * getPlayers
     */
    public getPlayers() {
        return this.players
    }

    // declare the function 
    public shuffle = (array: any[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    public loadActionFromLocalStorage = (key: string): Action[] => {
        if (typeof window !== 'undefined') {
            const string = localStorage.getItem(key)!
            if (string === null) {
                return []
            }
            const actions: Action[] = JSON.parse(string)
            return actions
        }
        return []
    }



    /**
     * newGame
     */
    public newGame(): Link[] {
        this.actions = actions
        const customActions = this.loadActionFromLocalStorage("actions")

        if (customActions.length < this.players.length) {
            alert(`Le nombre d'action est insuffisant par rapport au nombre de joueur. (${customActions.length}/${this.players.length}). Veuillez en ajouter dans les paramètres.`)
            return []
        }

        let pickedActions = this.shuffle(customActions)

        // shuffle player list
        let players = this.shuffle(this.players)
        console.log(players)
        // Pick a player
        let nextPlayer = players.pop()!
        const numbersOfLink = this.players.length
        for (let i = 0; i < numbersOfLink; i++) {
            // Pick a target
            console.log("Players remaining : ", players.length)
            let target = players.pop()!
            let action = pickedActions.pop()!
            // Populate chain
            let link: Link = { action, player: nextPlayer, target }
            // nextPlayer is the target
            nextPlayer = target
            // add the chains to the link
            this.chain.push(link)
            console.log("Players remaining : ", players.length)
        }
        let action = pickedActions.pop()!
        let target = this.chain[0].player
        let link: Link = { action, player: nextPlayer, target }
        this.chain.push(link)


        const suffledChain = this.shuffle(this.chain)
        return suffledChain

    }
}