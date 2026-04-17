export type Novel = {
  id: number;
  slug: string;
  title: string;
  coverSrc: string;
  latestChapter: string;
  updatedAgoLabel: string;
  author: string;
  status: "Đang ra" | "Hoàn thành";
  genres: string[];
  description: string;
  chapters: Array<{
    number: number;
    title: string;
    updatedAt: string;
  }>;
};

export const NOVELS: Novel[] = [
  {
    id: 1,
    slug: "the-shining",
    title: "The Shining",
    coverSrc: "/images/book-cover/the-shining.jpg",
    latestChapter: "Chương 142",
    updatedAgoLabel: "1 tháng",
    author: "Stephen King",
    status: "Hoàn thành",
    genres: ["Kinh dị", "Tâm lý"],
    description:
      "Câu chuyện kinh dị kinh điển về khách sạn Overlook và hành trình dần rơi vào điên loạn của Jack Torrance.",
    chapters: [
      { number: 142, title: "Khúc dạo cuối", updatedAt: "1 tháng trước" },
      { number: 141, title: "Bóng ma hành lang", updatedAt: "1 tháng trước" },
      { number: 140, title: "Tiếng gõ lúc nửa đêm", updatedAt: "2 tháng trước" },
    ],
  },
  {
    id: 2,
    slug: "overlord",
    title: "Overlord",
    coverSrc: "/images/book-cover/overlord.jpg",
    latestChapter: "Chương 142",
    updatedAgoLabel: "2 ngày",
    author: "Kugane Maruyama",
    status: "Đang ra",
    genres: ["Fantasy", "Isekai"],
    description:
      "Momonga bị mắc kẹt trong thế giới game dưới thân phận pháp sư tối thượng Ainz Ooal Gown.",
    chapters: [
      { number: 142, title: "Hoàng đế bóng đêm", updatedAt: "2 ngày trước" },
      { number: 141, title: "Binh đoàn Nazarick", updatedAt: "5 ngày trước" },
      { number: 140, title: "Lời triệu hồi cấm", updatedAt: "1 tuần trước" },
    ],
  },
  {
    id: 3,
    slug: "knight-of-seven-kingdom",
    title: "A Knight of the Seven Kingdoms",
    coverSrc: "/images/book-cover/knight-of-seven-kingdom.jpg",
    latestChapter: "Chương 142",
    updatedAgoLabel: "5 giờ",
    author: "George R.R. Martin",
    status: "Đang ra",
    genres: ["Fantasy", "Phiêu lưu", "Hiệp sĩ"],
    description:
      "Hành trình của hiệp sĩ Dunk và cậu bé Egg băng qua Bảy Vương Quốc, đối mặt âm mưu và danh dự của giới quý tộc.",
    chapters: [
      { number: 142, title: "Kỵ sĩ trong cơn mưa", updatedAt: "5 giờ trước" },
      { number: 141, title: "Hội chợ Ashford", updatedAt: "1 ngày trước" },
      { number: 140, title: "Lời thề của Dunk", updatedAt: "3 ngày trước" },
    ],
  },
  {
    id: 4,
    slug: "dune",
    title: "Dune",
    coverSrc: "/images/book-cover/dune.jpg",
    latestChapter: "Chương 87",
    updatedAgoLabel: "3 giờ",
    author: "Frank Herbert",
    status: "Hoàn thành",
    genres: ["Khoa huyễn", "Chính trị"],
    description:
      "Trên hành tinh cát Arrakis, Paul Atreides bước vào cuộc chiến quyền lực xoay quanh loại gia vị quý nhất vũ trụ.",
    chapters: [
      { number: 87, title: "Lời tiên tri trên cát", updatedAt: "3 giờ trước" },
      { number: 86, title: "Cuộc nổi dậy Fremen", updatedAt: "1 ngày trước" },
      { number: 85, title: "Ngai vàng Arrakis", updatedAt: "2 ngày trước" },
    ],
  },
  {
    id: 5,
    slug: "the-hobbit",
    title: "The Hobbit",
    coverSrc: "/images/book-cover/the-hobbit.jpg",
    latestChapter: "Chương 19",
    updatedAgoLabel: "1 ngày",
    author: "J.R.R. Tolkien",
    status: "Hoàn thành",
    genres: ["Fantasy", "Phiêu lưu"],
    description:
      "Bilbo Baggins rời vùng Shire yên bình để tham gia chuyến phiêu lưu cùng nhóm người lùn truy tìm kho báu bị rồng chiếm giữ.",
    chapters: [
      { number: 19, title: "Trở về Shire", updatedAt: "1 ngày trước" },
      { number: 18, title: "Trận chiến Năm cánh quân", updatedAt: "2 ngày trước" },
      { number: 17, title: "Con rồng Smaug", updatedAt: "4 ngày trước" },
    ],
  },
  {
    id: 6,
    slug: "a-song-of-ice-and-fire",
    title: "A Song of Ice and Fire",
    coverSrc: "/images/book-cover/a-song-of-ice-and-fire.jpg",
    latestChapter: "Chương 515",
    updatedAgoLabel: "2 giờ",
    author: "George R.R. Martin",
    status: "Đang ra",
    genres: ["Fantasy", "Chính trị", "Sử thi"],
    description:
      "Biên niên sử đẫm máu của Westeros, nơi các gia tộc tranh giành ngai sắt và những thế lực cổ xưa trỗi dậy từ phương Bắc.",
    chapters: [
      { number: 515, title: "Gió mùa đông", updatedAt: "2 giờ trước" },
      { number: 514, title: "Lửa và máu", updatedAt: "12 giờ trước" },
      { number: 513, title: "Bầy sói thức tỉnh", updatedAt: "1 ngày trước" },
    ],
  },
  {
    id: 7,
    slug: "the-little-prince",
    title: "The Little Prince",
    coverSrc: "/images/book-cover/the-little-prince.jpg",
    latestChapter: "Chương 27",
    updatedAgoLabel: "6 giờ",
    author: "Antoine de Saint-Exupery",
    status: "Hoàn thành",
    genres: ["Triết lý", "Thiếu nhi"],
    description:
      "Câu chuyện ngụ ngôn về cậu hoàng tử bé giúp người lớn nhìn lại trái tim và những điều quan trọng trong cuộc sống.",
    chapters: [
      { number: 27, title: "Ngôi sao của tôi", updatedAt: "6 giờ trước" },
      { number: 26, title: "Tạm biệt sa mạc", updatedAt: "1 ngày trước" },
      { number: 25, title: "Người gác đèn", updatedAt: "2 ngày trước" },
    ],
  },
  {
    id: 8,
    slug: "the-three-musketeers",
    title: "The Three Musketeers",
    coverSrc: "/images/book-cover/the-three-musketeers.jpg",
    latestChapter: "Chương 68",
    updatedAgoLabel: "4 ngày",
    author: "Alexandre Dumas",
    status: "Hoàn thành",
    genres: ["Lịch sử", "Phiêu lưu"],
    description:
      "D'Artagnan cùng ba chàng lính ngự lâm bảo vệ danh dự nước Pháp trong những cuộc đấu kiếm và âm mưu triều đình.",
    chapters: [
      { number: 68, title: "Một vì tất cả", updatedAt: "4 ngày trước" },
      { number: 67, title: "Cuộc đấu tại tu viện", updatedAt: "6 ngày trước" },
      { number: 66, title: "Bóng đêm của hồng y", updatedAt: "1 tuần trước" },
    ],
  },
];

export function buildNovelDetailPath(novel: Pick<Novel, "slug" | "id">) {
  return `/${novel.slug}-${novel.id}`;
}

export function buildNovelChapterPath(
  novel: Pick<Novel, "slug" | "id">,
  chapterNumber: number,
) {
  return `/${novel.slug}-${novel.id}/chap-${chapterNumber}`;
}

export function parseSlugId(slugId: string) {
  const match = slugId.match(/^(.*)-(\d+)$/);
  if (!match) return null;

  return {
    slug: match[1],
    id: Number(match[2]),
  };
}

export function parseChapterSlug(chapterSlug: string) {
  const match = chapterSlug.match(/^chap-(\d+)$/);
  if (!match) return null;

  const chapterNumber = Number(match[1]);
  if (!Number.isInteger(chapterNumber) || chapterNumber <= 0) return null;

  return chapterNumber;
}
