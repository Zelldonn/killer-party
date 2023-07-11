import { cpSync } from "fs";
import actions from "./data/actions";
import themes from "./data/themes";
import { Action, Binome, Player } from "./types";
import { TransgenderRounded } from "@mui/icons-material";

export class KillerGame {
    private playersName: string[] = []
    private chain: Player[] = []
    private actions: Action[] = []
    /**
     * addPlayer
     */
    public addPlayer(name: string) {
        this.playersName.push(name)
    }

    /**
     * removePlayer
     */
    public removePlayerByIndex(index: number) {
        const removedPlayer = this.playersName.splice(index, 1)
        console.log(`Player removed : ${removedPlayer}`)
    }

    /**
     * editPlayer
     */
    public editPlayerByIndex(index: number, newPlayer: string) {
        const editedPlayer = this.playersName[index] = newPlayer
        console.log(`Player removed : ${editedPlayer}`)
    }

    /**
     * getPlayers
     */
    public getPlayers() {
        return this.playersName
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
     * createTeamsFromPlayers
     */
    public createTeamsFromPlayers(): string[][] {
        const shuffledPlayers: string[] = this.shuffle(this.playersName)

        const playerCountIsPair = shuffledPlayers.length % 2 === 0

        let teams: string[][] = []
        console.log(playerCountIsPair)
        if (!playerCountIsPair) {
            teams.push(shuffledPlayers.splice(0, 3))
        }

        while (shuffledPlayers.length !== 0) {
            teams.push(shuffledPlayers.splice(0, 2))
        }
        return teams

    }

    /**
     * pickActionsFromDictionnary
     */
    public pickActionsFromDictionnary(count: number): Action[] {
        this.actions = actions
        const customActions = this.loadActionFromLocalStorage("actions")
        for (let i = 0; i < customActions.length; i++) {
            this.actions.push(customActions[i])
        }
        let pickedActions: Action[] = []
        for (let i = 0; i < count; i++) {
            let index = Math.floor(Math.random() * this.actions.length)
            pickedActions.push(this.actions[index])
        }
        return pickedActions
    }

    /**
     * assignWordToEachTeam
     */
    public createChainFromTeams(teams: Binome[]): Player[] {
        const randomIndex = Math.floor(Math.random() * themes.length)
        const selectedTheme = themes[randomIndex]
        console.log(selectedTheme)
        const numbersOfLink = teams.length - 1
        const selectedActions = this.pickActionsFromDictionnary(numbersOfLink + 1)

        // Pick a player
        console.log(teams[0], teams[1], teams[2])
        let nextBinome = teams.pop()!
        console.log(nextBinome)
        for (let i = 0; i < numbersOfLink; i++) {
            // Pick a target
            let targetedBinome = teams.pop()!
            let action = selectedActions.pop()!
            let word = selectedTheme.pop()

            let player: Player = { name: nextBinome[0], action, target: "Trouve ton ou tes coéquipiers pour avoir ta cible", word }
            // add the chains to the link
            this.chain.push(player)
            for (let z = 1; z < nextBinome.length; z++) {
                let player: Player = { name: nextBinome[z], action: { description: "Trouve ton ou tes coéquipiers pour avoir ta cible" }, target: targetedBinome[z], word }
                // add the chains to the link
                this.chain.push(player)
            }
            // nextPlayer is the target
            nextBinome = targetedBinome
        }
        let action = selectedActions.pop()!
        let targetedPlayer = this.chain[0].name
        let word = selectedTheme.pop()

        let player: Player = { name: nextBinome[0], action, target: "Trouve ton ou tes coéquipiers pour avoir ta cible", word }
        // add the chains to the link
        this.chain.push(player)
        for (let z = 1; z < nextBinome.length; z++) {
            let player: Player = { name: nextBinome[z], action: { description: "Trouve ton ou tes coéquipiers pour avoir ta cible" }, target: targetedPlayer, word }
            // add the chains to the link
            this.chain.push(player)
        }

        const suffledChain = this.shuffle(this.chain)
        return this.chain
    }

    /**
     * newGame
     */
    public newGame(): Player[] {

        // Create teams

        let teams = this.createTeamsFromPlayers()
        console.log(teams)
        let chainPlayers = this.createChainFromTeams(teams)
        console.log(chainPlayers)
        return chainPlayers


    }
}