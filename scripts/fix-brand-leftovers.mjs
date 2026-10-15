import fs from 'node:fs';

const files = [
  'src/pages/forum/[slug].astro',
  'src/pages/forum/index.astro',
  'src/components/WhySetupSection.astro',
  'src/i18n/en.ts',
];

for (const file of files) {
  let text = fs.readFileSync(file, 'utf8');
  const before = text;
  text = text.split('TarkovCheats').join('Tarkov Cheats');
  text = text.replace(/status:\s*'Escape from Tarkov[^']*'/, "status: 'Tarkov online'");
  if (text !== before) {
    fs.writeFileSync(file, text);
    console.log('updated', file);
  } else {
    console.log('noop', file);
  }
}
