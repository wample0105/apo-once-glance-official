// 文档章节序号徽标：01–09 章，附录无编号
export function chapterBadge(order: number): string {
  return order >= 10 ? '附' : String(order).padStart(2, '0');
}
