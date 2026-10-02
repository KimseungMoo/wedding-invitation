"use client";

import Image from "next/image";
import Link from "next/link";
import { wedding } from "@/wedding.config";
import { BrideNotes } from "./BrideNotes";
import { PromiseChat, TodayAlert } from "./PromiseChat";
import { Reminders } from "./Reminders";
import { Story } from "./Story";
import { UsAccount } from "./UsAccount";
import { CalendarWidget, DdayWidget } from "./UsCountdown";
import { UsVenue } from "./UsVenue";
import { UsWidget } from "./UsWidget";

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden>
    <path
      fill="#fff"
      d="M7.2 2.8c.5-.5 1.4-.5 1.9 0l1.7 1.7c.5.5.5 1.3.1 1.8L9.4 8.1c-.2.3-.2.7 0 1 1.2 1.8 2.7 3.3 4.5 4.5.3.2.7.2 1 0l1.8-1.5c.5-.4 1.3-.4 1.8.1l1.7 1.7c.5.5.5 1.4 0 1.9l-1.1 1.1c-.8.8-2 1.2-3.2 1-3.2-.5-6.3-2.3-8.7-4.7S4 8.3 3.5 5.1c-.2-1.2.2-2.4 1-3.2z"
    />
  </svg>
);

const MsgIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden>
    <path
      fill="#fff"
      d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8A2.5 2.5 0 0 1 17.5 16H9l-4.2 3.1c-.6.4-1.3 0-1.3-.7V5.5z"
    />
  </svg>
);

const CamIcon = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden>
    <path
      fill="#3a3a3c"
      d="M9.2 6.2 10 5h4l.8 1.2H18a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2zm2.8 3.3a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4z"
    />
  </svg>
);

const InviteHeart = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden>
    <path
      fill="#ff4b6a"
      d="M12 20.2 10.4 18.7C5.4 14.2 2 11.1 2 7.6 2 4.8 4.2 2.6 7 2.6c1.7 0 3.4.8 4.4 2.1 1-1.3 2.7-2.1 4.4-2.1 2.8 0 5 2.2 5 5 0 3.5-3.4 6.6-8.4 11.1z"
    />
  </svg>
);

export const UsHome = ({ onBack }: { onBack: () => void }) => {
  const { groom, bride, venue, us } = wedding;
  const tel = venue.tel.replace(/-/g, "");

  return (
    <div className="us-ios">
      <div className="us-ios-wall" aria-hidden>
        {/* decorative wallpaper; next/image is for the photo widget */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/main.jpeg" alt="" />
      </div>

      <div className="us-ios-home">
        <header className="us-ios-status">
          <button
            type="button"
            className="us-ios-time"
            onClick={onBack}
            aria-label={us.fileSelectTitle}
          >
            09:41
          </button>
          <div className="us-ios-tray" aria-hidden>
            <svg className="us-ios-signal" viewBox="0 0 18 12" width="17" height="11">
              <rect x="0" y="8" width="3" height="4" rx="0.6" fill="#fff" />
              <rect x="5" y="5" width="3" height="7" rx="0.6" fill="#fff" />
              <rect x="10" y="2.5" width="3" height="9.5" rx="0.6" fill="#fff" />
              <rect x="15" y="0" width="3" height="12" rx="0.6" fill="#fff" />
            </svg>
            <svg className="us-ios-wifi" viewBox="0 0 16 12" width="15" height="11">
              <path
                fill="#fff"
                d="M8 10.6a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4zm0-3.8c1.3 0 2.5.5 3.4 1.3l-1.2 1.2A2.6 2.6 0 0 0 8 8.6c-.8 0-1.5.3-2.1.7L4.7 8.1A4.7 4.7 0 0 1 8 6.8zm0-3.2c2.3 0 4.4.9 6 2.4L12.8 7A6.6 6.6 0 0 0 8 5.2 6.6 6.6 0 0 0 3.2 7L2 5.9A8.8 8.8 0 0 1 8 3.6z"
              />
            </svg>
            <i className="us-ios-battery" />
          </div>
        </header>

        <div className="us-ios-grid">
          <DdayWidget />
          <CalendarWidget />
          <BrideNotes />
          <UsWidget className="us-photo-tile" id="us-photo">
            <Image
              src="/main.jpeg"
              alt={`${groom.name} ${bride.name}`}
              fill
              sizes="180px"
              className="us-photo-img"
              priority
            />
          </UsWidget>
        </div>

        <TodayAlert />

        <div className="us-ios-dots" aria-hidden>
          <i className="is-on" />
          <i />
          <i />
        </div>

        <nav className="us-ios-dock" aria-label="바로가기">
          <a
            href={`tel:${tel}`}
            className="us-dock-app us-dock-phone"
            aria-label="전화"
          >
            <PhoneIcon />
          </a>
          <a href="#us-chat" className="us-dock-app us-dock-msg" aria-label="메시지">
            <MsgIcon />
          </a>
          <a
            href="#us-photo"
            className="us-dock-app us-dock-cam"
            aria-label="사진"
          >
            <CamIcon />
          </a>
          <Link href="/invitation" className="us-dock-app us-dock-invite">
            <InviteHeart />
            <span>청첩장</span>
          </Link>
        </nav>
      </div>

      <div className="us-ios-more">
        <Reminders />
        <Story />
        <UsVenue />
        <UsAccount />
        <div id="us-chat">
          <PromiseChat />
        </div>
        <Link href="/invitation" className="us-ios-more-link">
          {us.backLink}
        </Link>
      </div>
    </div>
  );
};
