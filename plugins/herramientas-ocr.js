import fetch from 'node-fetch';
import {webp2png} from '../lib/webp2mp4.js';
import _translate from "./_translate.js"
const tradutor = _translate.plugins.herramientas_ocr

const handler = async (m, {conn}) => {
  const q = m.quoted ? m.quoted : m;
  const mime = (q || q.msg).mimetype || q.mediaType || '';
  if (/image/.test(mime)) {
    const url = await webp2png(await q.download());
    const res = await fetch(API('https://api.ocr.space', '/parse/imageurl', {apikey: '8e65f273cd88957', url}));
    if (res.status !== 200) throw res.statusText;
    const json = await res.json();
    m.reply(json?.ParsedResults?.[0]?.ParsedText);
  } else throw tradutor.texto1;
};
handler.command = /^ocr|totexto$/i;
export default handler;