import React, { useState, useEffect } from "react";
import data from '../data.json'
import PokeCard from "./PokeCard";
import { Input, AppShell, Navbar, Header, ScrollArea } from '@mantine/core';
import searchStyle from "../components/style/searchStyle.css"

const Search = ({ }) => {
    const [term, setTerm] = useState('')
    const [poke, setPoke] = useState([])
    const [allTypes, setAllTypes] = useState([])
    const [selectedType, setSelectedType] = useState('')
    const [teammate, setTeammate] = useState([])

    useEffect(() => {
        setPoke(data)

        let pokeTypes = data.map((p) => {
            return p.type
        }).flat()
        pokeTypes = Array.from(new Set(pokeTypes))

        setAllTypes(pokeTypes)
    }, [])

    useEffect(() => {
        let empty = term === ''

        const filtered = data.filter(p => {
            if (empty && selectedType === '') {
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
                (selectedType === '' || type.includes(selectedType.toLowerCase()))
            )
        })
        setPoke(filtered)

    }, [term, selectedType])

    let addTeammate = (name) => {
        const found = teammate.find((nameOfTeammate) => {
            return nameOfTeammate === name
        })

        if (!found) {
            setTeammate([...teammate, name])
        }

    }


    return (

        <AppShell
            padding="md"
            fixed
            navbar={<Navbar grow={1} fixed position={{ bottom: 0, top: 0 }} mx="-xs" width={{ base: 300 }} height={500} p="xs">

                {
                    <div className="teamHeader">
                        <header>Your Team {teammate}</header>
                    </div>
                }


            </Navbar>}
            header={<Header fixed height={100} p="xs">{
                <div className="field">
                    <label>Pokedex Search</label>
                    <Input
                        value={term}
                        onChange={e => setTerm(e.target.value)}
                        className="input"
                        radius="md"
                        size="md"
                    />
                    <select
                        value={selectedType}
                        onChange={e => setSelectedType(e.target.value)}
                        className="ui dropdown">
                        <option value=''>Type</option>
                        {allTypes.map((t, i) => {
                            return <option key={i} value={t}> {t}</option>
                        })}
                    </select>
                </div>
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
                            onClick={addTeammate}>
                        </PokeCard>
                    )
                })}
            </div>}
        </AppShell>
    )
}


export default Search; 