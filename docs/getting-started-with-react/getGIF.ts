const gifKey = "CvMpOrkc6qI5mmAvhzAWHjFb59NMXXK1";

export const loadingGIF =
  "https://media.giphy.com/media/l3nWhI38IWDofyDrW/giphy.gif";

export async function getGIF(topic: string) {
  const searchURL = `http://api.giphy.com/v1/gifs/random?tag=${topic}&rating=PG&api_key=${gifKey}`;
  const response = await fetch(searchURL);
  const json = await response.json();
  return json.data.images.original.url;
}
