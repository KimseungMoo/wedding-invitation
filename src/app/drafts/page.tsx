import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "일러스트 시안",
  robots: { index: false, follow: false },
};

const scenes = [
  {
    id: "pizza",
    title: "피자",
    photo: "/illustrations/sources/pizza.jpg",
    illustration: "/illustrations/pizza.jpg",
    wide: true,
  },
  {
    id: "hands-side",
    title: "머리 위, 옆을 보는 포즈",
    photo: "/illustrations/sources/hands-side.jpg",
    illustration: "/illustrations/hands-side.jpg",
    wide: false,
  },
  {
    id: "hands-front",
    title: "머리 위, 정면 포즈",
    photo: "/illustrations/sources/hands-front.jpg",
    illustration: "/illustrations/hands-front.jpg",
    wide: false,
  },
  {
    id: "standing",
    title: "스탠딩",
    photo: "/illustrations/sources/standing.jpg",
    illustration: "/illustrations/standing.jpg",
    wide: false,
  },
];

export default function DraftsPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] px-6 py-16 text-[#4a4a4a]">
      <div className="mx-auto max-w-3xl">
        <p className="mb-2 text-center text-[10px] tracking-[0.3em] text-[#a08d6e]">
          ILLUSTRATION DRAFTS
        </p>
        <h1 className="mb-3 text-center text-2xl font-light">일러스트 시안</h1>
        <p className="mb-12 text-center text-sm leading-relaxed text-[#8b8b8b]">
          참고 청첩장 선화 스타일로 웨딩 사진을 옮긴 초안입니다.
        </p>

        <section className="mb-16 grid gap-6 sm:grid-cols-2">
          <figure className="overflow-hidden rounded-lg border border-[#e8e2d9] bg-white">
            <div className="relative aspect-[4/3] bg-white">
              <Image
                src="/illustrations/sources/style-reference.jpg"
                alt="참고 일러스트"
                fill
                className="object-contain"
                sizes="(min-width: 640px) 50vw, 100vw"
                priority
              />
            </div>
            <figcaption className="border-t border-[#f0ebe3] px-4 py-3 text-center text-xs tracking-wide text-[#a08d6e]">
              참고 스타일
            </figcaption>
          </figure>
          <figure className="overflow-hidden rounded-lg border border-[#e8e2d9] bg-white">
            <div className="relative aspect-[4/3] bg-white">
              <Image
                src="/illustrations/invitation-card.jpg"
                alt="청첩장 카드 시안"
                fill
                className="object-contain"
                sizes="(min-width: 640px) 50vw, 100vw"
                priority
              />
            </div>
            <figcaption className="border-t border-[#f0ebe3] px-4 py-3 text-center text-xs tracking-wide text-[#a08d6e]">
              카드 시안 · 김승무&성은지
            </figcaption>
          </figure>
        </section>

        <div className="space-y-14">
          {scenes.map((scene) => (
            <section key={scene.id}>
              <h2 className="mb-4 text-center text-sm tracking-wide text-[#6b6b6b]">
                {scene.title}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <figure className="overflow-hidden rounded-lg border border-[#e8e2d9] bg-white">
                  <div
                    className={`relative bg-[#faf9f6] ${
                      scene.wide ? "aspect-[4/3]" : "aspect-[3/4]"
                    }`}
                  >
                    <Image
                      src={scene.photo}
                      alt={`${scene.title} 원본 사진`}
                      fill
                      className="object-cover"
                      sizes="(min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                  <figcaption className="px-3 py-2 text-center text-[11px] text-[#b0b0b0]">
                    원본
                  </figcaption>
                </figure>
                <figure className="overflow-hidden rounded-lg border border-[#e8e2d9] bg-white">
                  <div
                    className={`relative bg-white ${
                      scene.wide ? "aspect-[4/3]" : "aspect-[3/4]"
                    }`}
                  >
                    <Image
                      src={scene.illustration}
                      alt={`${scene.title} 일러스트 시안`}
                      fill
                      className="object-contain"
                      sizes="(min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                  <figcaption className="px-3 py-2 text-center text-[11px] text-[#b0b0b0]">
                    시안
                  </figcaption>
                </figure>
              </div>
            </section>
          ))}
        </div>

        <p className="mt-16 text-center">
          <Link
            href="/invitation"
            className="text-xs tracking-wide text-[#a08d6e] underline-offset-4 hover:underline"
          >
            청첩장으로 돌아가기
          </Link>
        </p>
      </div>
    </main>
  );
}
