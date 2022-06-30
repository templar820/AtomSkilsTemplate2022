import formatFileSize from './index';

describe('formatFileSize', () => {
  it('Less than 1k', () => {
    expect(formatFileSize(123)).toBe('123 b');
  });

  it('Greater than 1k', () => {
    expect(formatFileSize(6123)).toBe('6 Kb');
  });

  it('With 2 decimals', () => {
    expect(formatFileSize(6123, 2)).toBe('5.98 Kb');
  });

  it('Greater than 1M', () => {
    expect(formatFileSize(6112129)).toBe('6 Mb');
  });

  it('1 metric Gb', () => {
    expect(formatFileSize(1000000000)).toBe('954 Mb');
  });

  it('1 binary Gb', () => {
    expect(formatFileSize(1073741824, 3)).toBe('1.000 Gb');
  });
});
