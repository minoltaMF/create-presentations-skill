import fs from "node:fs/promises";
import path from "node:path";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const ROOT = process.env.REPO_ROOT;
if (!ROOT) throw new Error("REPO_ROOT is required");

const OUT = path.join(ROOT, "examples", "create-presentations-overview");
const RENDERS = path.join(OUT, "renders");
const STYLE_DIR = path.join(ROOT, "assets", "style-gallery");
const STYLE_GALLERY = path.join(ROOT, "assets", "readme", "style-gallery.png");

const W = 1280;
const H = 720;
const C = {
  paper: "#F4F0E8",
  paper2: "#EAE4D8",
  ink: "#101318",
  muted: "#667085",
  blue: "#074ED8",
  navy: "#05275F",
  amber: "#E5A52A",
  coral: "#DA4B37",
  green: "#145B43",
  white: "#FFFFFF",
};

async function bytes(file) {
  const b = await fs.readFile(file);
  return b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
}

async function saveBlob(file, blob) {
  await fs.writeFile(file, new Uint8Array(await blob.arrayBuffer()));
}

function rect(slide, x, y, w, h, fill, name = "rect") {
  return slide.shapes.add({
    geometry: "rect",
    name,
    position: { left: x, top: y, width: w, height: h },
    fill,
    line: { style: "solid", fill: "none", width: 0 },
  });
}

function ellipse(slide, x, y, w, h, fill, name = "ellipse") {
  return slide.shapes.add({
    geometry: "ellipse",
    name,
    position: { left: x, top: y, width: w, height: h },
    fill,
    line: { style: "solid", fill: "none", width: 0 },
  });
}

function text(slide, value, x, y, w, h, size, color = C.ink, opts = {}) {
  const shape = slide.shapes.add({
    geometry: "textbox",
    name: opts.name || "text",
    position: { left: x, top: y, width: w, height: h },
    fill: "none",
    line: { style: "solid", fill: "none", width: 0 },
  });
  shape.text = value;
  shape.text.style = {
    fontSize: size,
    fontFamily: opts.fontFamily || "Aptos",
    bold: opts.bold ?? false,
    color,
    alignment: opts.alignment || "left",
    verticalAlignment: opts.verticalAlignment || "top",
  };
  return shape;
}

function label(slide, value, x = 64, y = 50, color = C.blue) {
  text(slide, value.toUpperCase(), x, y, 420, 26, 12, color, {
    bold: true,
    name: "eyebrow",
  });
}

function title(slide, value, y = 86, color = C.ink, width = 1080) {
  text(slide, value, 64, y, width, 100, 44, color, {
    bold: true,
    fontFamily: "Aptos Display",
    name: "slide-title",
  });
}

function footer(slide, page, onDark = false) {
  rect(slide, 64, 676, 1152, 1, onDark ? "#FFFFFF55" : "#10131833", "footer-rule");
  text(slide, "CREATE PRESENTATIONS", 64, 685, 300, 18, 10, onDark ? C.white : C.muted, { bold: true });
  text(slide, String(page).padStart(2, "0"), 1160, 685, 56, 18, 10, onDark ? C.white : C.muted, { bold: true, alignment: "right" });
}

async function addImage(slide, file, position, fit = "cover", name = "image") {
  slide.images.add({
    blob: await bytes(file),
    contentType: "image/png",
    alt: name,
    fit,
    position,
    name,
  });
}

async function buildOverview() {
  const deck = Presentation.create({ slideSize: { width: W, height: H } });

  // 01 — image-first cover
  {
    const slide = deck.slides.add();
    await addImage(slide, path.join(STYLE_DIR, "01-creator-paper-editorial.png"), { left: 0, top: 0, width: W, height: H }, "cover", "visual-cover");
  }

  // 02 — five decisions
  {
    const slide = deck.slides.add();
    slide.background.fill = C.paper;
    label(slide, "System before decoration");
    title(slide, "A deck is five decisions, not one prompt.");
    const items = [
      ["01", "Narrative", "What changes for the audience"],
      ["02", "Visible copy", "What the audience can actually read"],
      ["03", "Visual system", "How the story feels and moves"],
      ["04", "Production route", "What stays editable or visual"],
      ["05", "Delivery evidence", "What was rendered and checked"],
    ];
    items.forEach((it, i) => {
      const y = 226 + i * 78;
      text(slide, it[0], 66, y, 50, 34, 15, C.blue, { bold: true });
      text(slide, it[1], 132, y - 4, 270, 38, 24, C.ink, { bold: true });
      text(slide, it[2], 430, y, 650, 32, 18, C.muted);
      rect(slide, 132, y + 44, 1010, 1, "#10131822", `rule-${i}`);
    });
    ellipse(slide, 1110, 65, 76, 76, C.amber, "amber-signal");
    footer(slide, 2);
  }

  // 03 — page jobs
  {
    const slide = deck.slides.add();
    slide.background.fill = C.paper;
    label(slide, "Flexible page narratives");
    title(slide, "Plan communication jobs before layouts.");
    text(slide, "A sequence should accumulate meaning. Page roles can change without losing the deck-level system.", 64, 180, 800, 56, 22, C.muted);
    const jobs = ["Open", "Frame", "Explain", "Compare", "Prove", "Resolve"];
    jobs.forEach((job, i) => {
      const x = 72 + i * 190;
      const heights = [74, 126, 186, 112, 210, 146];
      rect(slide, x, 570 - heights[i], 132, heights[i], i === 5 ? C.blue : i % 2 === 0 ? C.navy : C.paper2, `job-${i}`);
      text(slide, String(i + 1).padStart(2, "0"), x, 584, 44, 20, 11, C.blue, { bold: true });
      text(slide, job, x + 30, 579, 112, 28, 16, C.ink, { bold: true });
    });
    rect(slide, 72, 606, 1082, 3, C.ink, "sequence-baseline");
    footer(slide, 3);
  }

  // 04 — routes
  {
    const slide = deck.slides.add();
    slide.background.fill = C.ink;
    label(slide, "Route before rendering", 64, 50, "#8FB5FF");
    title(slide, "Choose the route before you build.", 86, C.white);
    const routes = [
      ["NATIVE", "Precise and editable", 210, C.blue],
      ["VISUAL", "Maximum full-slide fidelity", 292, C.amber],
      ["HYBRID", "Editable key content + visual layers", 250, "#2E7D64"],
      ["TEMPLATE", "Inherit existing masters", 184, "#7C66CE"],
      ["HTML", "Portable and interactive", 228, C.coral],
    ];
    routes.forEach((r, i) => {
      const x = 64 + i * 230;
      rect(slide, x, 610 - r[2], 172, r[2], r[3], `route-${i}`);
      text(slide, r[0], x, 620 - r[2], 172, 32, 18, C.white, { bold: true });
      text(slide, r[1], x, 626, 190, 34, 13, "#D5D8DE");
    });
    footer(slide, 4, true);
  }

  // 05 — model routing
  {
    const slide = deck.slides.add();
    slide.background.fill = C.paper;
    label(slide, "Provider-neutral by design");
    title(slide, "Route each model to the work it does best.");
    text(slide, "The reasoning model, image backend, and file renderer are independent choices.", 64, 178, 920, 44, 22, C.muted);
    const blocks = [
      ["THINK", "Narrative · research · copy", C.navy],
      ["SEE", "Full-slide images · illustration", C.amber],
      ["BUILD", "PPTX · HTML · PDF", C.blue],
    ];
    blocks.forEach((b, i) => {
      const x = 64 + i * 390;
      text(slide, b[0], x, 286, 280, 86, 54, b[2], { bold: true, fontFamily: "Aptos Display" });
      rect(slide, x, 384, 280, 5, b[2], `model-rule-${i}`);
      text(slide, b[1], x, 412, 300, 58, 18, C.ink, { bold: true });
      if (i < 2) text(slide, "→", x + 315, 324, 50, 50, 36, C.muted, { bold: true, alignment: "center" });
    });
    text(slide, "Codex · Claude · GPT · Gemini", 64, 540, 310, 28, 14, C.muted);
    text(slide, "gpt-image · Gemini Image · Flux", 454, 540, 310, 28, 14, C.muted);
    text(slide, "Artifact Tool · PptxGenJS · browser", 844, 540, 360, 28, 14, C.muted);
    footer(slide, 5);
  }

  // 06 — style gallery
  {
    const slide = deck.slides.add();
    slide.background.fill = C.paper;
    label(slide, "Same brief, materially different Design DNA");
    title(slide, "One brief can support sixteen visual systems.", 80, C.ink, 1140);
    await addImage(slide, STYLE_GALLERY, { left: 64, top: 176, width: 1152, height: 473 }, "contain", "sixteen-style-gallery");
    footer(slide, 6);
  }

  // 07 — visible copy
  {
    const slide = deck.slides.add();
    slide.background.fill = C.paper;
    label(slide, "Visible-copy integrity");
    title(slide, "Approved copy and visual instructions are different inputs.", 86, C.ink, 1140);
    rect(slide, 64, 226, 520, 326, C.blue, "approved-copy");
    text(slide, "VISIBLE COPY", 96, 258, 260, 28, 13, "#BFD3FF", { bold: true });
    text(slide, "Only the words the audience should read.", 96, 318, 390, 116, 36, C.white, { bold: true, fontFamily: "Aptos Display" });
    text(slide, "Titles · labels · values · citations", 96, 482, 380, 32, 17, C.white);
    rect(slide, 620, 226, 596, 326, C.paper2, "visual-instructions");
    text(slide, "VISUAL INSTRUCTIONS", 656, 258, 320, 28, 13, C.coral, { bold: true });
    text(slide, "Composition, density, image treatment, rhythm, and constraints stay outside the slide copy.", 656, 318, 490, 140, 29, C.ink, { bold: true, fontFamily: "Aptos Display" });
    text(slide, "Review unexpected dates, numbers, filenames, URLs, and prompt leakage.", 656, 482, 490, 44, 16, C.muted);
    footer(slide, 7);
  }

  // 08 — QA
  {
    const slide = deck.slides.add();
    slide.background.fill = C.paper;
    label(slide, "Quality is a production stage");
    title(slide, "Render, inspect, revise.");
    const words = [
      ["RENDER", C.navy, "Every page"],
      ["INSPECT", C.amber, "Full size + contact sheet"],
      ["REVISE", C.blue, "Fix locally before regenerating"],
    ];
    words.forEach((w, i) => {
      const x = 64 + i * 390;
      text(slide, w[0], x, 260, 340, 84, 48, w[1], { bold: true, fontFamily: "Aptos Display" });
      rect(slide, x, 356, 320, 4, w[1], `qa-rule-${i}`);
      text(slide, w[2], x, 382, 320, 52, 19, C.ink, { bold: true });
    });
    text(slide, "Copy · crops · hierarchy · fonts · overflow · repetition · notes · links · editability", 64, 516, 1120, 52, 20, C.muted);
    footer(slide, 8);
  }

  // 09 — delivery
  {
    const slide = deck.slides.add();
    slide.background.fill = C.paper;
    label(slide, "Delivery follows audience needs");
    title(slide, "Deliver the format the audience can actually use.", 86, C.ink, 1100);
    text(slide, "One approved plan can produce more than one route without changing the story.", 64, 178, 900, 44, 22, C.muted);
    const outputs = [
      ["Editable", "Native PPTX", C.blue],
      ["High fidelity", "Visual PPTX", C.amber],
      ["Balanced", "Hybrid PPTX", C.green],
      ["Portable", "HTML / PDF", C.coral],
      ["Auditable", "Manifest + sources", C.navy],
    ];
    outputs.forEach((o, i) => {
      const y = 258 + i * 70;
      text(slide, o[0].toUpperCase(), 66, y, 180, 26, 12, o[2], { bold: true });
      text(slide, o[1], 254, y - 6, 420, 38, 26, C.ink, { bold: true });
      rect(slide, 700, y + 12, 420 - i * 46, 5, o[2], `delivery-line-${i}`);
    });
    ellipse(slide, 1070, 450, 110, 110, C.amber, "delivery-signal");
    footer(slide, 9);
  }

  // 10 — close
  {
    const slide = deck.slides.add();
    slide.background.fill = C.navy;
    label(slide, "Install · brief · choose · build", 64, 60, "#9FBEFF");
    text(slide, "One skill.\nMultiple models.\nPresentation-ready evidence.", 64, 144, 800, 330, 56, C.white, { bold: true, fontFamily: "Aptos Display", name: "closing-title" });
    ellipse(slide, 934, 144, 218, 218, C.amber, "closing-disc");
    rect(slide, 884, 350, 300, 182, C.blue, "closing-plane");
    text(slide, "npx skills add\nminoltaMF/create-presentations-skill", 64, 558, 680, 70, 20, "#C9D8FF", { bold: true });
    footer(slide, 10, true);
  }

  await fs.mkdir(RENDERS, { recursive: true });
  for (const [i, slide] of deck.slides.items.entries()) {
    const png = await deck.export({ slide, format: "png", scale: 1 });
    await saveBlob(path.join(RENDERS, `slide-${String(i + 1).padStart(2, "0")}.png`), png);
  }
  const pptx = await PresentationFile.exportPptx(deck);
  await pptx.save(path.join(OUT, "create-presentations-overview.pptx"));
}

async function buildStyleShowcase() {
  const deck = Presentation.create({ slideSize: { width: W, height: H } });
  const files = (await fs.readdir(STYLE_DIR)).filter((f) => f.endsWith(".png")).sort();
  for (const file of files) {
    const slide = deck.slides.add();
    await addImage(slide, path.join(STYLE_DIR, file), { left: 0, top: 0, width: W, height: H }, "cover", file.replace(/\.png$/, ""));
  }
  const pptx = await PresentationFile.exportPptx(deck);
  await pptx.save(path.join(OUT, "create-presentations-style-showcase.pptx"));
}

async function buildHtml() {
  const gallery = (await fs.readFile(STYLE_GALLERY)).toString("base64");
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Create Presentations — overview</title>
<link rel="icon" href="data:,">
<style>
:root{--paper:#f4f0e8;--paper2:#eae4d8;--ink:#101318;--muted:#667085;--blue:#074ed8;--navy:#05275f;--amber:#e5a52a;--coral:#da4b37;--green:#145b43}
*{box-sizing:border-box}body{margin:0;background:#17191d;color:var(--ink);font-family:Aptos,Inter,system-ui,sans-serif;overflow:hidden}
.deck{height:100vh;display:grid;place-items:center}.slide{display:none;position:relative;width:min(100vw,177.777vh);aspect-ratio:16/9;background:var(--paper);padding:5% 5% 4%;overflow:hidden}.slide.active{display:block}
.eyebrow{font-size:1.1vw;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--blue)}h1,h2,p{margin:0}h1{font-size:6.4vw;line-height:.92;letter-spacing:-.055em}h2{font-size:3.8vw;line-height:1;letter-spacing:-.04em;max-width:88%}.sub{margin-top:2.2%;max-width:70%;font-size:1.6vw;line-height:1.35;color:var(--muted)}
.footer{position:absolute;left:5%;right:5%;bottom:2.4%;border-top:1px solid #10131844;padding-top:.8%;display:flex;justify-content:space-between;font-size:.75vw;font-weight:800;color:var(--muted)}
.cover{padding:0;background-image:url('data:image/png;base64,${(await fs.readFile(path.join(STYLE_DIR,"01-creator-paper-editorial.png"))).toString("base64")}');background-size:cover;background-position:center}.dark{background:var(--ink);color:white}.dark .eyebrow{color:#8fb5ff}.dark .footer{border-color:#ffffff55;color:white}
.decisions{margin-top:4%;display:grid;gap:1.4vh}.decision{display:grid;grid-template-columns:5% 25% 1fr;align-items:center;border-bottom:1px solid #10131822;padding:1.05% 0;font-size:1.35vw}.decision b:first-child{color:var(--blue);font-size:1vw}.decision strong{font-size:1.75vw}.decision span{color:var(--muted)}
.roles{position:absolute;left:5%;right:5%;bottom:16%;height:42%;display:flex;align-items:end;gap:4%}.role{flex:1;background:var(--navy);min-height:25%;position:relative}.role:nth-child(even){background:var(--paper2)}.role:nth-child(3){height:78%}.role:nth-child(5){height:88%}.role b{position:absolute;top:calc(100% + 1.2vh);font-size:1.2vw}.role:nth-child(1){height:32%}.role:nth-child(2){height:52%}.role:nth-child(4){height:44%}.role:nth-child(6){height:62%;background:var(--blue)}
.route-bars{position:absolute;left:5%;right:5%;bottom:14%;height:56%;display:flex;align-items:end;gap:4%}.route{flex:1;color:white;padding:1.2%;font-weight:800}.route small{display:block;margin-top:.5vh;font-size:.85vw;font-weight:500;color:#fff}.route:nth-child(1){height:56%;background:var(--blue)}.route:nth-child(2){height:76%;background:var(--amber)}.route:nth-child(3){height:66%;background:var(--green)}.route:nth-child(4){height:48%;background:#7c66ce}.route:nth-child(5){height:60%;background:var(--coral)}
.models{margin-top:8%;display:grid;grid-template-columns:1fr auto 1fr auto 1fr;align-items:center;gap:3%}.model h3{font-size:4.4vw;margin:0;border-bottom:5px solid currentColor;padding-bottom:3%}.model p{margin-top:8%;font-size:1.35vw;font-weight:700}.arrow{font-size:3vw;color:var(--muted)}
.gallery{margin-top:2.5%;width:100%;height:64%;object-fit:contain}.copy-split{display:grid;grid-template-columns:1fr 1.15fr;gap:3%;margin-top:4%}.copy{padding:4%;min-height:42vh}.copy:first-child{background:var(--blue);color:white}.copy:last-child{background:var(--paper2)}.copy small{font-size:1vw;font-weight:800;letter-spacing:.12em}.copy h3{font-size:2.8vw;line-height:1.08}.copy p{font-size:1.2vw;line-height:1.4;color:inherit}
.qa{margin-top:8%;display:grid;grid-template-columns:repeat(3,1fr);gap:4%}.qa h3{font-size:4vw;margin:0;border-bottom:5px solid;padding-bottom:4%}.qa p{font-size:1.25vw;font-weight:700}.outputs{margin-top:5%;display:grid;gap:1.4vh}.output{display:grid;grid-template-columns:16% 34% 1fr;align-items:center}.output small{font-size:.9vw;font-weight:800;color:var(--blue)}.output strong{font-size:2vw}.output i{height:5px;background:var(--blue)}
.close{background:var(--navy);color:white}.close h1{font-size:5.2vw;max-width:70%}.disc{position:absolute;width:18%;aspect-ratio:1;border-radius:50%;background:var(--amber);right:10%;top:18%}.plane{position:absolute;width:25%;height:25%;background:var(--blue);right:7%;top:48%}.command{position:absolute;left:5%;bottom:13%;font-size:1.45vw;color:#c9d8ff;font-weight:800}
.progress{position:fixed;right:18px;bottom:14px;color:white;font-size:12px;opacity:.8}.hint{position:fixed;left:18px;bottom:14px;color:white;font-size:12px;opacity:.55}
@media(max-aspect-ratio:4/3){.slide{width:100vw;height:auto}.eyebrow{font-size:1.8vw}.decision{font-size:1.7vw}}
@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto}}
</style>
</head>
<body><main class="deck">
<section class="slide cover active" aria-label="Create Presentations cover"></section>
<section class="slide"><div class="eyebrow">System before decoration</div><h2>A deck is five decisions, not one prompt.</h2><div class="decisions">
<div class="decision"><b>01</b><strong>Narrative</strong><span>What changes for the audience</span></div><div class="decision"><b>02</b><strong>Visible copy</strong><span>What the audience can actually read</span></div><div class="decision"><b>03</b><strong>Visual system</strong><span>How the story feels and moves</span></div><div class="decision"><b>04</b><strong>Production route</strong><span>What stays editable or visual</span></div><div class="decision"><b>05</b><strong>Delivery evidence</strong><span>What was rendered and checked</span></div></div><footer class="footer"><span>CREATE PRESENTATIONS</span><span>02</span></footer></section>
<section class="slide"><div class="eyebrow">Flexible page narratives</div><h2>Plan communication jobs before layouts.</h2><p class="sub">A sequence should accumulate meaning. Page roles can change without losing the deck-level system.</p><div class="roles"><div class="role"><b>Open</b></div><div class="role"><b>Frame</b></div><div class="role"><b>Explain</b></div><div class="role"><b>Compare</b></div><div class="role"><b>Prove</b></div><div class="role"><b>Resolve</b></div></div><footer class="footer"><span>CREATE PRESENTATIONS</span><span>03</span></footer></section>
<section class="slide dark"><div class="eyebrow">Route before rendering</div><h2>Choose the route before you build.</h2><div class="route-bars"><div class="route">NATIVE<small>Precise and editable</small></div><div class="route">VISUAL<small>Maximum fidelity</small></div><div class="route">HYBRID<small>Editable + visual</small></div><div class="route">TEMPLATE<small>Inherited masters</small></div><div class="route">HTML<small>Portable and interactive</small></div></div><footer class="footer"><span>CREATE PRESENTATIONS</span><span>04</span></footer></section>
<section class="slide"><div class="eyebrow">Provider-neutral by design</div><h2>Route each model to the work it does best.</h2><p class="sub">The reasoning model, image backend, and file renderer are independent choices.</p><div class="models"><div class="model" style="color:var(--navy)"><h3>THINK</h3><p>Narrative · research · copy</p></div><div class="arrow">→</div><div class="model" style="color:var(--amber)"><h3>SEE</h3><p>Full-slide images · illustration</p></div><div class="arrow">→</div><div class="model" style="color:var(--blue)"><h3>BUILD</h3><p>PPTX · HTML · PDF</p></div></div><footer class="footer"><span>CREATE PRESENTATIONS</span><span>05</span></footer></section>
<section class="slide"><div class="eyebrow">Same brief, materially different Design DNA</div><h2>One brief can support sixteen visual systems.</h2><img class="gallery" alt="Sixteen style studies" src="data:image/png;base64,${gallery}"><footer class="footer"><span>CREATE PRESENTATIONS</span><span>06</span></footer></section>
<section class="slide"><div class="eyebrow">Visible-copy integrity</div><h2>Approved copy and visual instructions are different inputs.</h2><div class="copy-split"><div class="copy"><small>VISIBLE COPY</small><h3>Only the words the audience should read.</h3><p>Titles · labels · values · citations</p></div><div class="copy"><small style="color:var(--coral)">VISUAL INSTRUCTIONS</small><h3>Composition, density, image treatment, rhythm, and constraints stay outside slide copy.</h3><p>Review unexpected dates, numbers, filenames, URLs, and prompt leakage.</p></div></div><footer class="footer"><span>CREATE PRESENTATIONS</span><span>07</span></footer></section>
<section class="slide"><div class="eyebrow">Quality is a production stage</div><h2>Render, inspect, revise.</h2><div class="qa"><div><h3 style="color:var(--navy)">RENDER</h3><p>Every page</p></div><div><h3 style="color:var(--amber)">INSPECT</h3><p>Full size + contact sheet</p></div><div><h3 style="color:var(--blue)">REVISE</h3><p>Fix locally before regenerating</p></div></div><p class="sub">Copy · crops · hierarchy · fonts · overflow · repetition · notes · links · editability</p><footer class="footer"><span>CREATE PRESENTATIONS</span><span>08</span></footer></section>
<section class="slide"><div class="eyebrow">Delivery follows audience needs</div><h2>Deliver the format the audience can actually use.</h2><p class="sub">One approved plan can produce more than one route without changing the story.</p><div class="outputs"><div class="output"><small>EDITABLE</small><strong>Native PPTX</strong><i></i></div><div class="output"><small>HIGH FIDELITY</small><strong>Visual PPTX</strong><i style="background:var(--amber);width:88%"></i></div><div class="output"><small>BALANCED</small><strong>Hybrid PPTX</strong><i style="background:var(--green);width:72%"></i></div><div class="output"><small>PORTABLE</small><strong>HTML / PDF</strong><i style="background:var(--coral);width:56%"></i></div><div class="output"><small>AUDITABLE</small><strong>Manifest + sources</strong><i style="background:var(--navy);width:40%"></i></div></div><footer class="footer"><span>CREATE PRESENTATIONS</span><span>09</span></footer></section>
<section class="slide close"><div class="eyebrow">Install · brief · choose · build</div><h1>One skill.<br>Multiple models.<br>Presentation-ready evidence.</h1><div class="disc"></div><div class="plane"></div><div class="command">npx skills add minoltaMF/create-presentations-skill</div><footer class="footer"><span>CREATE PRESENTATIONS</span><span>10</span></footer></section>
</main><div class="hint">← → / Space</div><div class="progress"><span id="current">1</span> / 10</div>
<script>const slides=[...document.querySelectorAll('.slide')];let index=0;function show(next){index=(next+slides.length)%slides.length;slides.forEach((s,i)=>s.classList.toggle('active',i===index));document.getElementById('current').textContent=index+1}addEventListener('keydown',e=>{if(['ArrowRight','PageDown',' '].includes(e.key))show(index+1);if(['ArrowLeft','PageUp'].includes(e.key))show(index-1);if(e.key==='Home')show(0);if(e.key==='End')show(slides.length-1)});addEventListener('click',e=>{if(!e.target.closest('a'))show(index+1)});</script></body></html>`;
  await fs.writeFile(path.join(OUT, "create-presentations-overview.html"), html);
}

await fs.mkdir(OUT, { recursive: true });
await buildOverview();
await buildStyleShowcase();
await buildHtml();
