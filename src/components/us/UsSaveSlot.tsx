"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { wedding } from "@/wedding.config";
import { BrideAdventurer, GroomAdventurer, HollowHeart } from "./UsSprites";

type Menu = "continue" | "new";

export const UsSaveSlot = ({ onContinue }: { onContinue: () => void }) => {
  const { groom, bride, date, us } = wedding;
  const [menu, setMenu] = useState<Menu>("continue");
  const [wink, setWink] = useState(false);
  const ymd = date.iso.replaceAll("-", ".");

  const fireWink = useCallback(() => {
    setMenu("new");
    setWink(true);
    window.setTimeout(() => setWink(false), 1600);
  }, []);

  const choose = useCallback(() => {
    if (menu === "continue") onContinue();
    else fireWink();
  }, [fireWink, menu, onContinue]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        setMenu((prev) => (prev === "continue" ? "new" : "continue"));
      }
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        choose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [choose]);

  return (
    <section className="us-entry">
      <div className="us-file-banner us-brick">
        <h1 className="us-pixel">{us.fileSelectTitle}</h1>
      </div>

      <article className="us-file-frame us-brick">
        <div className="us-file-inner">
          <div className="us-file-hero">
            <GroomAdventurer scale={3} label={groom.name} />
            <div className="min-w-0">
              <p className="us-pixel us-file-id">{us.playerLabel}</p>
              <i className="us-file-rule" />
            </div>
          </div>

          <div className="us-file-stats">
            <div className="us-file-stat-row">
              <span className="us-ko">{groom.name}</span>
              <span className="us-pixel us-file-date">{ymd}</span>
            </div>
            <p className="us-ko">{bride.name}</p>
          </div>

          <p className="us-file-hearts">
            <span className="us-pixel">{us.heartsLabel}</span>
            <span className="us-file-heart-row" aria-hidden>
              <HollowHeart size={12} />
              <HollowHeart size={12} />
              <HollowHeart size={12} />
            </span>
          </p>

          <div className="us-file-menu">
            <button
              type="button"
              className="us-file-option"
              data-us-continue
              onClick={onContinue}
              onMouseEnter={() => setMenu("continue")}
              onFocus={() => setMenu("continue")}
            >
              <span
                className={`us-cursor${menu === "continue" ? " is-on" : ""}`}
                aria-hidden
              />
              <span className="us-pixel">{us.continueLabel}</span>
            </button>
            <button
              type="button"
              className="us-file-option"
              data-us-newgame
              onClick={fireWink}
              onMouseEnter={() => setMenu("new")}
              onFocus={() => setMenu("new")}
            >
              <span
                className={`us-cursor${menu === "new" ? " is-on" : ""}`}
                aria-hidden
              />
              <span className="us-pixel">{us.newGameLabel}</span>
            </button>
          </div>

          <div className="us-file-bride">
            <BrideAdventurer scale={3} label={bride.name} />
          </div>

          {wink ? (
            <div className="us-wink" role="status">
              <div className="us-brick us-wink-box">
                <p className="us-pixel">{us.newGameWink}</p>
              </div>
            </div>
          ) : null}
        </div>
      </article>

      <Link href="/invitation" className="us-peek">
        {us.backLink}
      </Link>
    </section>
  );
};
