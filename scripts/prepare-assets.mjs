import sharp from "sharp";
import { resolve } from "node:path";

// Optional asset pipeline: input is two approved landscape cover originals.
const [journey, portfolio] = process.argv.slice(2);
if (!journey || !portfolio)
  throw new Error(
    "Usage: node scripts/prepare-assets.mjs <journey-image> <portfolio-image>",
  );
for (const [name, input] of [
  ["journey", journey],
  ["portfolio", portfolio],
]) {
  const output = resolve(`public/images/${name}-cover.webp`);
  await sharp(input)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(output);
  console.log(`Optimized ${name} cover → ${output}`);
}
