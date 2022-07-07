import { createContext, useState } from 'react';

export const FavouritesContext = createContext({
    ids: [],
    addFavourite: (id) => {

    },
    removeFavourite: (id) => {

    }
});


function FavouritesContextProvider({children}) {
    const [favouriteMealIds, setFavouriteMealsIds] = useState([]);

    function addFavourite(id) {
        setFavouriteMealsIds((currentFavIds) => [...currentFavIds, id]);
    }

    function removeFavourite(id) {
        setFavouriteMealsIds((currentFavIds) => currentFavIds.filter(i => i !== id))
    }

    const value = {
        ids: favouriteMealIds,
        addFavourite: addFavourite,
        removeFavourite: removeFavourite
    }

    return <FavouritesContext.Provider value={value}>{children}</FavouritesContext.Provider>
}

export default FavouritesContextProvider;
