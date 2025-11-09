import { useCallback, useEffect, useState } from 'react';
import '../App.css';
import { PokemonCharacter } from './PokemonCharacter';
import { Header } from './Header';

function MainContainer() {

  const [IsLoading, setIsLoading] = useState(true);
  const [pokemonList, setpokemonList] = useState([]);
  const [nextUrl, setNextUrl] = useState('https://content.newtonschool.co/v1/pr/64ccef982071a9ad01d36ff6/pokemonspages1');

  const fetchPokemonRecords = useCallback(async (url) => {

    try {

      setIsLoading(true);

      const response = await fetch(url);
      const [pokemonListResult] = await response.json();

      console.log(pokemonListResult);
      setpokemonList([...pokemonList, ...pokemonListResult.results]);
      
      setNextUrl(pokemonListResult.next);

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }

  }, [pokemonList])

  const loadMorePokeMons = () => {
    if(nextUrl) {
      fetchPokemonRecords(nextUrl);
    }
  }

  useEffect(() => {
    fetchPokemonRecords(nextUrl);
  }, [fetchPokemonRecords, nextUrl, pokemonList]);

  return (
    <main>
      <Header />

      {IsLoading ? <div>Loading...</div> : 
        (<section className='body-container'>
          <section className='card-container'>
            {pokemonList && pokemonList.map(({ url }, index) => {
              return <PokemonCharacter pokemonUrl={url} key={index} />
            })}
          </section>
          <button className='load-more' onClick={loadMorePokeMons}>More Pokemons</button>
        </section>)
      }
    </main>
  );
}

export default MainContainer;
