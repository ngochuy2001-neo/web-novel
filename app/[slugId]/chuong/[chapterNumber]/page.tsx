import { notFound } from "next/navigation";
import { ReaderContent } from "@/components/ReaderContent";
import { NOVELS, parseSlugId } from "@/lib/novels";

type ChapterReaderPageProps = {
  params: Promise<{
    slugId: string;
    chapterNumber: string;
  }>;
};

const DEMO_PARAGRAPHS = [
  "Tiếng mưa lộp bộp trên mũ sắt khi Ser Duncan đứng trước cổng thành, nhìn những lá cờ của các gia tộc phấp phới trong gió đêm. Bầu trời xám chì như báo trước một cuộc tranh tài không hề bình yên.",
  "Egg kéo cao cổ áo choàng, đôi mắt tím ánh lên vẻ háo hức lẫn lo lắng. Cậu biết Dunk không phải kẻ giỏi ăn nói trước đám quý tộc, nhưng khi vào trận, không ai có thể xem thường thanh kiếm và danh dự của anh.",
  "Trong đại sảnh, những lời chào hỏi nghe có vẻ lịch thiệp, nhưng bên dưới mỗi nụ cười là một lưỡi dao giấu kín. Dunk cảm nhận rõ ánh mắt dò xét bám theo từng bước chân của mình.",
  "Khi hồi kèn vang lên, sân đấu bỗng im phăng phắc. Dunk nắm chặt chuôi kiếm, tự nhủ rằng mình chiến đấu không chỉ cho bản thân, mà còn cho lời thề của một hiệp sĩ chân chính giữa thời đại đầy dối trá.",
];

export default async function ChapterReaderPage({ params }: ChapterReaderPageProps) {
  const { slugId, chapterNumber } = await params;
  const parsed = parseSlugId(slugId);
  if (!parsed) notFound();

  const chapterNum = Number(chapterNumber);
  if (!Number.isInteger(chapterNum) || chapterNum <= 0) notFound();

  const novel = NOVELS.find((item) => item.id === parsed.id && item.slug === parsed.slug);
  if (!novel) notFound();

  const chapter = novel.chapters.find((item) => item.number === chapterNum) ?? {
    number: chapterNum,
    title: "Chương mẫu",
    updatedAt: "Vừa xong",
  };

  return (
    <ReaderContent
      novelTitle={novel.title}
      chapterNumber={chapter.number}
      chapterTitle={chapter.title}
      paragraphs={DEMO_PARAGRAPHS}
      backHref={`/${novel.slug}-${novel.id}`}
    />
  );
}
