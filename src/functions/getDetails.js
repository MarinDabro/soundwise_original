const getDetails = async (type, id, searchParams, query) => {
  const result = await fetch(
    `https://api.spotify.com/v1/${type}s/${id}${query ? query : ""}`,
    searchParams
  )
    .then(res => res.json())
    .then(res => {
      console.log("getDetails", res);
      return res;
    });

  return result;
};

export default getDetails;
