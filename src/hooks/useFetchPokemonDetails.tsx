import { gql, useQuery } from "@apollo/client";

type useFetchPokemonProps = {
  pokeId: number
}

const GET_POKEMON_LIST = gql`
  query pokemonDetails($pokeId: Int) {
    pokemon_v2_pokemon(where: {id: {_eq: $pokeId}}) {
      id
      name
      height
      weight
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          name
        }
      }
      pokemon_v2_pokemonabilities {
        is_hidden
        pokemon_v2_ability {
          name
        }
      }
      base_experience
      pokemon_v2_pokemonmoves {
        pokemon_v2_move {
          name
          pp
          power
          pokemon_v2_type {
            name
          }
          pokemon_v2_movedamageclass {
            name
          }
        }
      }
      pokemon_v2_pokemonspecy {
        pokemon_v2_evolutionchain {
          pokemon_v2_pokemonspecies_aggregate {
            nodes {
              name
              id
            }
          }
        }
        pokemon_v2_pokemonspeciesflavortexts(where: {language_id: {_eq: 9}}) {
          flavor_text
          language_id
        }
        evolution_chain_id
        capture_rate
        gender_rate
        growth_rate_id
        pokemon_v2_pokemonegggroups {
          pokemon_v2_egggroup {
            name
          }
        }
      }
    }
  }
`;

const useFetchPokemonDetails = ( props : useFetchPokemonProps) => {  
  return useQuery<{ pokemon_v2_pokemon: any[1] }>(GET_POKEMON_LIST, { variables: props });    
}

export default useFetchPokemonDetails;