import React from 'react'
import data from '../data.json'

export const PokemonContext = React.createContext({
    pokemon: [

    ]
})

export const PokemonProvider = ({ children }) => {
    return <PokemonContext.Provider value={{pokemon: data}}> {children} </PokemonContext.Provider>
}