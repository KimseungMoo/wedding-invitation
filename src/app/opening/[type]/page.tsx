"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import {
  HeartFill,
  DoorOpen,
  RibbonUnwind,
  HeartBeat,
  GardenGate,
  WaxSeal,
} from "@/components/intro";

/**
 * 오프닝별 개별 페이지
 * /opening/heart, /opening/door 등으로 하객별 다른 오프닝 링크 전달 가능
 */

const openingComponents: Record<string, React.ComponentType> = {
  heart: HeartFill,
  heartbeat: HeartBeat,
  door: DoorOpen,
  garden: GardenGate,
  ribbon: RibbonUnwind,
  seal: WaxSeal,
};

export default function OpeningPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = use(params);
  const Component = openingComponents[type];

  if (!Component) {
    notFound();
  }

  return <Component />;
}
