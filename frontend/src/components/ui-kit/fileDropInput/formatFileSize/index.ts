/**
 * 640000 -> 640 Kb
 */
export default function formatFileSize(size: number, decimals = 0): string {
  const thresh = 1024;

  if (Math.abs(size) < thresh) {
    return size + ' b';
  }

  const units = ['Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb'];
  let u = -1;
  const r = 10 ** decimals;

  do {
    size /= thresh;
    ++u;
  } while (Math.round(Math.abs(size) * r) / r >= thresh && u < units.length - 1);

  return size.toFixed(decimals) + ' ' + units[u];
}
