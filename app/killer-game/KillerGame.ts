import actions from "./data/actions";
import { Action, Link, Player } from "./types";

export class KillerGame {
    private players: Player[] = []
    private chain: Link[] = []
    private actions: Action[] = actions
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


    /**
     * newGame
     */
    public newGame(): Link[] {
        let pickedActions: Action[] = []
        for (let i = 0; i < this.players.length; i++) {
            let index = Math.floor(Math.random() * this.actions.length)
            pickedActions.push(this.actions[index])
        }
        console.log(pickedActions)

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