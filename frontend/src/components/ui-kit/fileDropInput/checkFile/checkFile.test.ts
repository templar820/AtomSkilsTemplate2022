import checkFile from './index';

describe('checkFile', () => {
  it('main.schema', () => {
    expect(checkFile('main.schema')).toBe('schema');
  });
  it('Screenshot 2020-12-19 at 14.36.12.png', () => {
    expect(checkFile('Screenshot 2020-12-19 at 14.36.12.png')).toBe('png');
  });
  it('BooksList.container', () => {
    expect(checkFile('BooksList.container')).toBe('container');
  });
  it('No extension', () => {
    expect(checkFile('file-with-no-extension')).toBe('');
  });
  it('Only extension', () => {
    expect(checkFile('.mddict')).toBe('mddict');
  });
});
