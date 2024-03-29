import { PlayIcon, PauseIcon } from "./icons";
import { useState, useEffect } from "react";

export function AudioPlayer({
  player_id,
  source,
  title,
}: //demo,
{
  source: string;
  title: string;
  player_id: string;
  //demo: boolean;
}) {
  const [_document, set_document] = useState<Document | null>(null);

  useEffect(() => {
    set_document(document);
  }, []);

  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState("0:00");
  const [seek, setSeek] = useState(0);
  const [max, setMax] = useState(100);
  const [currentTime, setCurrentTime] = useState("0:00");

  const calcTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
  };

  const player =
    _document !== null
      ? (_document.getElementById(player_id) as HTMLAudioElement)
      : null;

  const play = () => {
    document.querySelectorAll("audio").forEach((el) => el.pause());
    setPlaying(true);
    if (player !== null) {
      player.play().catch((error) => console.error(error));
      player.addEventListener("pause", () => {
        setPlaying(false);
      });
    }
  };
  const pause = () => {
    setPlaying(false);
    if (player !== null) {
      player.pause();
    }
  };

  let rAF: number | null = null;

  const whilePlaying = () => {
    if (_document !== null && player !== null) {
      const seekSlider = _document.getElementById(
        "seek-slider"
      ) as HTMLInputElement;
      seekSlider.value = Math.floor(player.currentTime).toString();
      rAF = requestAnimationFrame(whilePlaying);
    }
  };

  useEffect(() => {
    if (player !== null) {
      if (player.readyState > 0) {
        setDuration(calcTime(player.duration));
        setMax(Math.floor(player.duration));
        //if (demo) player.volume = 0;
        player.addEventListener("timeupdate", () => {
          setCurrentTime(calcTime(Math.floor(player.currentTime)));
          setSeek(Math.floor(player.currentTime));
          /*           if (demo)
            player.volume = Math.max(
              1 -
                Math.max(
                  0,
                  (2 - (player.duration - player.currentTime)) / 2,
                  1 - player.currentTime
                ),
              0
            ); */
        });
      } else {
        player.addEventListener("loadedmetadata", () => {
          setDuration(calcTime(player.duration));
          setMax(Math.floor(player.duration));
          //if (demo) player.volume = 0;
          player.addEventListener("timeupdate", () => {
            setCurrentTime(calcTime(Math.floor(player.currentTime)));
            setSeek(Math.floor(player.currentTime));
            /*             if (demo)
              player.volume = Math.max(
                1 -
                  Math.max(
                    0,
                    (2 - (player.duration - player.currentTime)) / 2,
                    1 - player.currentTime
                  ),
                0
              ); */
          });
        });
      }
    }
    //eslint-disable-next-line
  }, [player]);

  return (
    <main className="z-10 w-2/3 max-md:w-5/6">
      <div className="relative flex h-16 w-full flex-row items-center bg-stone-900">
        <audio id={player_id} src={source} preload="metadata"></audio>
        <div className="flex h-full w-20 items-center justify-center border-r border-stone-700 md:w-32">
          <button
            onClick={() => {
              play();
              requestAnimationFrame(whilePlaying);
            }}
            className={`text-stone-100 ${playing ? "hidden" : "block"}`}
          >
            <PlayIcon />
          </button>
          <button
            onClick={() => {
              pause();
              cancelAnimationFrame(rAF as number);
            }}
            className={`text-stone-100 ${playing ? "block" : "hidden"}`}
          >
            <PauseIcon />
          </button>
        </div>
        <div className="relative flex h-full w-full flex-row items-center max-md:justify-between">
          <div className="z-20 w-full pl-2 md:pl-6">
            <p className="w-full text-stone-100 max-md:text-xs">{title}</p>
            <p className="text-sm text-stone-400">Second Hand Dan</p>
          </div>
          <div className="z-20 flex h-full w-full items-start justify-center text-sm max-md:w-3/5">
            <span className="pt-2 text-stone-400 max-md:text-xs">
              {currentTime} / {duration}
            </span>
          </div>
          <div
            style={{ width: `${Math.ceil((seek / max) * 100)}%` }}
            className={`absolute left-0 z-10 h-full border-r border-stone-500 bg-stone-700 text-stone-100`}
          />
          <input
            type="range"
            id="seek-slider"
            className="absolute left-0 z-30 h-full w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:invisible"
            max={max}
            value={seek}
            onInput={() => {
              if (player !== null) {
                if (!player.paused) {
                  cancelAnimationFrame(rAF as number);
                }
              }
            }}
            onChange={(e) => {
              setSeek(parseInt(e.target.value));
              setCurrentTime(calcTime(parseInt(e.target.value)));
              if (player !== null) {
                player.currentTime = parseInt(e.target.value);
                if (!player.paused) {
                  requestAnimationFrame(whilePlaying);
                }
              }
            }}
          />
        </div>
      </div>
    </main>
  );
}
