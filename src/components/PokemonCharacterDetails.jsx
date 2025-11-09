import { useContext } from "react"
import { ShowModalContext } from "./CustomProvider/Context/ShowModalProvider";

export const PokemonCharacterDetails = (props) => {

    const {showModal, setShowModal} = useContext(ShowModalContext);
    const {pokemonDetails : {image, name, weight, height, stats, type}} = showModal;

    return (
        <aside className={`modal-container ${type}`}>
            <section className="stats-container">
                <div className="column-1">
                    <img src={image} alt={`Image of ${name}`} />
                    <h3>{name}</h3>
                </div>
                <section className={`details-container ${type}`}>
                    <div className="column-2">
                        <p>Weight : {weight}</p>
                        <p>Height : {height}</p>
                    </div>
                    <div className="column-3">
                        {stats.map(({stat : {name}}, index) => <p key={index}>Stat{index+1} : {name}</p>)}
                    </div>
                    <div className="column-4">
                        {stats.map(({base_stat}, index) => <p key={index}>BS{index + 1} : {base_stat}</p>)}
                    </div>
                </section>
            </section>

            <button className={`close-modal ${type}-btn`} onClick={() => setShowModal({...showModal, show : false})}>X</button>
        </aside>
    )
}