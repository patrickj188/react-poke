import React, { useState, useEffect } from "react";
import axios from "axios";
import data from '../data.json'

const Search = () => {
    const [term, setTerm] = useState('')
    const [poke, setPoke] = useState([])
    const [allTypes, setAllTypes] = useState([])
    const [selectedType, setSelectedType] = useState('')

    // useEffect(() => {
    //     const search = async () => {
    //         const { data } = await axios.get('../data/data.json', {
    //             params: {
    //                 name: 'data.name.english',
    //                 id: 'data.id',
    //                 search: term
    //             },
    //         });
    //     };

    // })

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

    return (

        <div>
            <div className="ui form">
                <div className="field">
                    <label>Search</label>
                    <input
                        value={term}
                        onChange={e => setTerm(e.target.value)}
                        className="input" />
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
            </div>
            {poke.map((d, i) => {
                return <div key={i}> {d.name.english} </div>
            })}
        </div>
    )
}


export default Search; 