import esbuild from "esbuild";
import path from "node:path";
import fs from "node:fs";

const watch = process.argv.includes("--watch");
const projectRoot = process.cwd(); // you are running from /electron

const outdir = path.resolve(projectRoot, "dist-electron");
if (!fs.existsSync(outdir)) fs.mkdirSync(outdir, { recursive: true });

// Your sources live in /electron/electron/*.ts
const mainEntry = path.resolve(projectRoot, "electron", "main.ts");
const preloadEntry = path.resolve(projectRoot, "electron", "preload.ts");

for (const f of [mainEntry, preloadEntry]) {
  if (!fs.existsSync(f)) {
    console.error("❌ Entry file not found:", f);
    process.exit(1);
  }
}

const common = {
  bundle: true,
  platform: "node",
  target: "node18",
  sourcemap: true,
  external: ["electron"],
  format: "cjs",
};

const ctx = await esbuild.context({
  entryPoints: {
    main: mainEntry,
    preload: preloadEntry,
  },
  outdir,
  ...common,
});

await ctx.rebuild();
console.log("✅ Built Electron files →", outdir);

if (watch) {
  await ctx.watch();
  console.log("✅ Watching Electron main/preload for changes…");
} else {
  await ctx.dispose();
}