import { PlayIcon, PauseIcon } from "./icons";
import { useState, useEffect } from "react";

export function AudioPlayer({
  player_id,
  source,
  title,
}: {
  source: string;
  title: string;
  player_id: string;
}) {
  const [_document, set_document] = useState<Document | null>(null);

  useEffect(() => {
    set_document(document);
  }, []);

  const [playing, setPlaying] = useState(false);

  const player =
    _document !== null
      ? (_document.getElementById(player_id) as HTMLAudioElement)
      : null;

  const play = () => {
    setPlaying(true);
    if (player !== null) {
      player.play().catch((error) => console.error(error));
    }
  };
  const pause = () => {
    setPlaying(false);
    if (player !== null) {
      player.pause();
    }
  };

  return (
    <>
      <div className="container flex h-16 w-2/3 flex-row items-center bg-stone-900">
        <audio id={player_id} src={source}></audio>
        <div className="flex h-full w-20 items-center justify-center border-r border-stone-600">
          <button
            onClick={play}
            className={`text-white ${playing ? "hidden" : "block"}`}
          >
            <PlayIcon />
          </button>
          <button
            onClick={pause}
            className={`text-white ${playing ? "block" : "hidden"}`}
          >
            <PauseIcon />
          </button>
        </div>
        <div className="pl-4">
          <p className="text-white">{title}</p>
          <p className="text-sm text-stone-400">Scalise</p>
        </div>
      </div>
    </>
  );
}
