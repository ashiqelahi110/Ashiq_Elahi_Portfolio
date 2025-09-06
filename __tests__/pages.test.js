const fs = require('fs');
const path = require('path');

describe('HTML pages', () => {
  const pages = ['index.html', 'thankyou.html'];

  test.each(pages)('%s contains DOCTYPE', (page) => {
    const filePath = path.join(__dirname, '..', page);
    const html = fs.readFileSync(filePath, 'utf8');
    expect(html).toMatch(/<!DOCTYPE html>/i);
  });
});
