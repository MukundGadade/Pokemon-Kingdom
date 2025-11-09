import { useCallback, useContext, useEffect, useState } from "react"
import { ShowModalContext } from "./CustomProvider/Context/ShowModalProvider";

export const PokemonCharacter = ({pokemonUrl}) => {

    const {setShowModal} = useContext(ShowModalContext);

    const [IsLoading, setIsLoading] = useState(true);
    const [pokemonInfo, setPokemonInfo] = useState({});

    const fetchPokemonInfo = useCallback(async () => {

        try {
            setIsLoading(true);

            const response = await fetch(pokemonUrl);
            const [pokemonDetails] = await response.json();

            // console.log(pokemonDetails);
            setPokemonInfo(pokemonDetails);
            
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }

    }, [pokemonUrl])

    useEffect(() => {
        fetchPokemonInfo();
    }, [fetchPokemonInfo]);

    return (
        <section className={`pokemon-card ${pokemonInfo.type}`}>
            {IsLoading ? <div>Loading...</div> : 
                (<>
                    <div className={`card-id ${pokemonInfo.type}-btn`}>#{pokemonInfo.id}</div>
                    <img src={pokemonInfo.image} alt={pokemonInfo.name} />
                    <div className="char-name">{pokemonInfo.name}</div>
                    <div className="char-type">Type : {pokemonInfo.type}</div>
                    <button className={`know-more ${pokemonInfo.type}-btn`} onClick={() => setShowModal({show : true, pokemonDetails : pokemonInfo})}>Know More...</button>
                </>)
            }
        </section>
    )
}