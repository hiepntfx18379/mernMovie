const favoriteUtils = {
  check: ({ listFavorites, mediaId }) => {
    try{
      if(listFavorites.data.lenth > 0)
        return  [...listFavorites.data].find((f) => `${f.mediaId}` === `${mediaId}`)
      
      return false;
    }catch{
      return false
    }
  }
};
export default favoriteUtils;
