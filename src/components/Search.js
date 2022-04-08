import React, { useState, useEffect, useContext, useMemo } from "react";
import { PokemonContext } from "./PokemonContext";
import PokeCard from "./PokeCard";
import { Input, AppShell, Navbar, Header, List, Button, Divider, Title, Select } from '@mantine/core';
import searchStyle from "../components/style/searchStyle.css"


const Search = ({ }) => {
    const [term, setTerm] = useState('')
    const [poke, setPoke] = useState([])
    const [selectedType, setSelectedType] = useState(null)
    const [teammate, setTeammate] = useState([])
    
    const pokemon = useContext(PokemonContext).pokemon

    const allTypes = useMemo(() => {
        let pokeTypes = pokemon.map((p) => {
            return p.type
        }).flat()
        pokeTypes = Array.from(new Set(pokeTypes))
        return pokeTypes

    }, [pokemon])

    useEffect(() => {
        let empty = term === ''

        const filtered = pokemon.filter(p => {
            if (empty && !selectedType) {
                return true;

            }
            const name = p.name.english.toLowerCase()
            const id = p.id.toString()
            const type = p.type.map((t) => {
                return t.toLowerCase()
            })
            const search = term.toLowerCase()
            return (
                (empty || name.includes(search)) &&
                (!selectedType || type.includes(selectedType.toLowerCase()))
            )
        })
        setPoke(filtered)

    }, [term, selectedType])

    useEffect(() => {
        console.log(teammate)

    }, [teammate])

    let addTeammate = (name) => {
        setTeammate([...teammate, name])
    }

    let removeTeammate = (index) => {

        const newArr = [...teammate]
        newArr.splice(index, 1)
        setTeammate(newArr)
        console.log("delete that bitch " + index)

    }

    let addOrRemoveTeammate = (name) => {
        const foundIndex = getIndexOfPokemonOnTeam(name)
        if (foundIndex >= 0) {
            removeTeammate(foundIndex)
        } else {
            addTeammate(name)
        }

    }

    let getIndexOfPokemonOnTeam = (name) => {
        const foundIndex = teammate.findIndex((nameOfTeammate) => {
            return nameOfTeammate === name
        })

        return foundIndex
    }

    return (

        <AppShell
            padding="md"
            fixed
            navbar={<Navbar fixed mx="-xs" width={{ base: 300 }} p="xs">
                <div className="field">
                    <label>Pokedex Search</label>
                    <Input
                        value={term}
                        onChange={e => setTerm(e.target.value)}
                        className="input"
                        radius="md"
                        size="md"
                    />
                    <Select
                        clearable
                        data={allTypes}
                        placeholder="Filter by type"
                        nothingFound="Nothing found"
                        onChange={type => setSelectedType(type)}
                    />
                </div>

                <div className="teamDiv">
                    <header className="teamHeader">Your Team</header>
                    <List>
                        {teammate.map((pokeTeam, id) => {
                            return (<div key={id}>
                                <List.Item>
                                    {pokeTeam}
                                    <Button onClick={() => { removeTeammate(pokeTeam) }} className="removeButton" radius="xl" size="xs">
                                        Remove
                                    </Button>
                                </List.Item>
                                <Divider my="sm" />

                            </div>)
                        })}
                    </List>
                </div>

            </Navbar>}
            header={<Header fixed height={60} p="xs">{
                <Title>Pokedex</Title>
            }</Header>}
            styles={(theme) => ({
                main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
            })}
        >
            {<div className="cardContainer">
                {poke.map((d, i) => {
                    return (
                        <PokeCard
                            key={i}
                            name={d.name.english}
                            img={d.thumbnail}
                            description={d.description}
                            species={d.species}
                            type={d.type}
                            id={d.id}
                            onClick={addOrRemoveTeammate}
                            isOnTeam={getIndexOfPokemonOnTeam(d.name.english) >= 0}
                        >
                        </PokeCard>
                    )
                })}
            </div>}
        </AppShell>
    )
}


export default Search; 