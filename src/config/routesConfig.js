import loadable from "@loadable/component";

const PokemonList = loadable(() => import("../pages/PokemonList"));
const MyPokemonList = loadable(() => import("../pages/MyPokemonList"));
const PokemonDetail = loadable(() => import("../pages/PokemonDetail"));

export const routes = [
  {
    path: '/',
    component: PokemonList,
    childRoutes: [],
  },
  {
    path: '/detail',
    component: PokemonDetail,
    childRoutes: [],
  },
  {
    path: '/mypokemons',
    component: MyPokemonList,
    childRoutes: [],
  }
];
