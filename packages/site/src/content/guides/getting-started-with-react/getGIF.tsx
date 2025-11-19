import { useState } from "react";
import { Card } from "@jobber/components/Card";
import { Content } from "@jobber/components/Content";
import { Button } from "@jobber/components/Button";
import { InputText } from "@jobber/components/InputText";

const gifKey = "CvMpOrkc6qI5mmAvhzAWHjFb59NMXXK1";

export const loadingGIF =
  "https://media.giphy.com/media/l3nWhI38IWDofyDrW/giphy.gif";

export async function getGIF(topic: string) {
  const searchURL = `//api.giphy.com/v1/gifs/random?tag=${topic}&rating=PG&api_key=${gifKey}`;
  const response = await fetch(searchURL);
  const json = await response.json();

  return json.data.images.original.url;
}

export function GifGift() {
  const [topic, setTopic] = useState<string>("");
  const [url, setURL] = useState<string | undefined>(undefined);

  return (
    <Card header="Gif Gift">
      <Content>
        <InputText
          value={topic}
          onChange={(newValue: string) => setTopic(newValue)}
          placeholder="Topic"
        />
        <Button label="Search" fullWidth={true} onClick={gifSearch} />
        <center>{url && <img src={url} />}</center>
      </Content>
    </Card>
  );

  async function gifSearch() {
    setURL(loadingGIF);
    setURL(await getGIF(topic));
  }
}
