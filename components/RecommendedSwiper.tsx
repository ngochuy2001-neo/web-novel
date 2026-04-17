"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

type RecommendedNovel = {
  id: string;
  title: string;
  coverSrc: string;
  latestChapter: string;
};

const DEMO_RECOMMENDED: RecommendedNovel[] = [
  {
    id: "the-shining",
    title: "The Shining",
    coverSrc: "/images/book-cover/the-shining.jpg",
    latestChapter: "Chương 142",
  },
  {
    id: "dune",
    title: "Dune",
    coverSrc: "/images/book-cover/dune.jpg",
    latestChapter: "Chương 87",
  },
  {
    id: "overlord",
    title: "Overlord",
    coverSrc: "/images/book-cover/overlord.jpg",
    latestChapter: "Chương 331",
  },
  {
    id: "the-hobbit",
    title: "The Hobbit",
    coverSrc: "/images/book-cover/the-hobbit.jpg",
    latestChapter: "Chương 19",
  },
  {
    id: "a-song-of-ice-and-fire",
    title: "A Song of Ice and Fire",
    coverSrc: "/images/book-cover/a-song-of-ice-and-fire.jpg",
    latestChapter: "Chương 515",
  },
  {
    id: "the-little-prince",
    title: "The Little Prince",
    coverSrc: "/images/book-cover/the-little-prince.jpg",
    latestChapter: "Chương 27",
  },
  {
    id: "the-three-musketeers",
    title: "The Three Musketeers",
    coverSrc: "/images/book-cover/the-three-musketeers.jpg",
    latestChapter: "Chương 68",
  },
  {
    id: "knight-of-seven-kingdom",
    title: "A Knight of the Seven Kingdoms",
    coverSrc: "/images/book-cover/knight-of-seven-kingdom.jpg",
    latestChapter: "Chương 12",
  },
];

function RecommendedSlide({ novel }: { novel: RecommendedNovel }) {
  return (
    <article
      className="group/card w-full cursor-pointer"
      role="button"
      tabIndex={0}
      onClick={() => {
        // tạm thời để demo: xác nhận đang nhấn truyện nào
        // eslint-disable-next-line no-console
        console.log("[recommended-click]", { id: novel.id, title: novel.title });
      }}
      onKeyDown={(e) => {
        if (e.key !== "Enter" && e.key !== " ") return;
        e.preventDefault();
        // eslint-disable-next-line no-console
        console.log("[recommended-click]", { id: novel.id, title: novel.title });
      }}
    >
      <div
        className={[
          "relative w-full overflow-hidden rounded-2xl border border-black/8 bg-zinc-100",
          "transition-all duration-200",
          "group-hover/card:border-red-500/70 group-hover/card:ring-2 group-hover/card:ring-red-500/40",
          "group-hover/card:shadow-[0_0_24px_rgba(239,68,68,0.45)]",
        ].join(" ")}
      >
        <div className="relative aspect-2/3 w-full">
          <Image
            src={novel.coverSrc}
            alt={novel.title}
            fill
            sizes="(max-width: 768px) 40vw, 220px"
            className="object-cover"
          />
        </div>
      </div>

      <div className="mt-3 space-y-1 text-center">
        <div className="line-clamp-1 text-sm font-bold text-zinc-950">
          {novel.title}
        </div>
        <div className="line-clamp-1 text-sm text-zinc-600">
          {novel.latestChapter}
        </div>
      </div>
    </article>
  );
}

export function RecommendedSwiper() {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-zinc-950">
              Truyện đề cử
            </h2>
            <p className="mt-1 text-sm text-zinc-600">
              Một vài đầu truyện nổi bật dành cho bạn.
            </p>
          </div>
        </div>

        <div className="mt-4 h-[260px] w-full rounded-3xl border border-black/8 bg-zinc-50" />
      </section>
    );
  }

  return (
    <section>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-zinc-950">
            Truyện đề cử
          </h2>
          <p className="mt-1 text-sm text-zinc-600">
            Một vài đầu truyện nổi bật dành cho bạn.
          </p>
        </div>
      </div>

      <div className="group/swiper relative mt-4">
        <button
          ref={prevRef}
          type="button"
          aria-label="Xem trước"
          className={[
            "absolute left-0 top-1/2 z-10 -translate-y-1/2",
            "hidden h-20 w-10 items-center justify-center rounded-md",
            "bg-zinc-950/30 text-white/70 shadow-sm backdrop-blur-sm",
            "opacity-55 transition-all duration-200",
            "group-hover/swiper:opacity-100 group-hover/swiper:bg-zinc-950/70 group-hover/swiper:text-white/95",
            "hover:opacity-100 hover:bg-zinc-950/80 hover:text-white",
            "active:scale-[0.98]",
            "lg:inline-flex",
          ].join(" ")}
        >
          <span className="text-3xl leading-none">‹</span>
        </button>

        <button
          ref={nextRef}
          type="button"
          aria-label="Xem tiếp"
          className={[
            "absolute right-0 top-1/2 z-10 -translate-y-1/2",
            "hidden h-20 w-10 items-center justify-center rounded-md",
            "bg-zinc-950/30 text-white/70 shadow-sm backdrop-blur-sm",
            "opacity-55 transition-all duration-200",
            "group-hover/swiper:opacity-100 group-hover/swiper:bg-zinc-950/70 group-hover/swiper:text-white/95",
            "hover:opacity-100 hover:bg-zinc-950/80 hover:text-white",
            "active:scale-[0.98]",
            "lg:inline-flex",
          ].join(" ")}
        >
          <span className="text-3xl leading-none">›</span>
        </button>

        <Swiper
          modules={[Navigation, Autoplay]}
          loop
          spaceBetween={16}
          slidesPerView={2}
          preventClicks={false}
          preventClicksPropagation={false}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            // Swiper reads navigation elements on init; wire refs here.
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const params = swiper.params.navigation as any;
            params.prevEl = prevRef.current;
            params.nextEl = nextRef.current;
          }}
          className="px-0 lg:px-14"
          breakpoints={{
            640: { slidesPerView: 3, allowTouchMove: true, simulateTouch: true },
            768: { slidesPerView: 4, allowTouchMove: true, simulateTouch: true },
            1024: { slidesPerView: 6, allowTouchMove: false, simulateTouch: false },
          }}
        >
          {DEMO_RECOMMENDED.map((novel) => (
            <SwiperSlide key={novel.id}>
              <RecommendedSlide novel={novel} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

