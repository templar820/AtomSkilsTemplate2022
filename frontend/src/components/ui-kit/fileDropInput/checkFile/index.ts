/**
 * Возвращает расширение файла
 */
export default function checkFile(filename: string): string {
  const dotIndex = filename.lastIndexOf('.');

  return dotIndex === -1 ? '' : filename.slice(dotIndex + 1);
}
