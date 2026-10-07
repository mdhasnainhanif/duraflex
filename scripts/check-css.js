const http = require('http');

http.get('http://localhost:3003/products', res => {
  let html = '';
  res.on('data', c => html += c);
  res.on('end', () => {
    // Find all css link hrefs
    const hrefs = [];
    const re = /href="([^"]+\.css[^"]*)"/g;
    let m;
    while (m = re.exec(html)) {
      hrefs.push(m[1]);
    }
    console.log('Found CSS files:', hrefs);

    if (hrefs.length > 0) {
      http.get('http://localhost:3003' + hrefs[0], cssRes => {
        let css = '';
        cssRes.on('data', c => css += c);
        cssRes.on('end', () => {
          // Look for body and color-background
          const bodyMatches = css.match(/[^{}]*body[^{}]*\{[^}]+\}/g);
          console.log('Matches for body:', bodyMatches);
          const bgMatches = css.match(/[^{}]*--color-background[^{}]*:[^;]+;/g);
          console.log('Matches for --color-background:', bgMatches);
          const mainMatches = css.match(/[^{}]*#main-content[^{}]*\{[^}]+\}/g);
          console.log('Matches for #main-content:', mainMatches);
        });
      });
    }
  });
});
