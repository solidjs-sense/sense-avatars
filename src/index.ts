import md5 from 'md5';

// release canvas since safari will cache canvas memory usage for a white
const releaseCanvas = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
  canvas.width = 1;
  canvas.height = 1;
  ctx.clearRect(0, 0, 1, 1);
  canvas.width = 0;
  canvas.height = 0;
};

const dataLen = 8;
const dSize = 36;
const pSize = 6;

export const generatorAvator = ({ name, bg, fg, size }: { name: string; bg?: string; fg?: string; size?: number }) => {
  const hash = md5(name)
    .split('')
    .filter((c) => c !== '+' && c !== '/')
    .slice(0, dataLen);

  // canvas
  const canvas = document.createElement('canvas');
  canvas.width = dSize;
  canvas.height = dSize;
  const ctx = canvas.getContext('2d')!;

  if (!ctx) {
    throw new Error('Init canvas context 2d error');
  }

  // bg
  ctx.fillStyle = bg || '#fafafa';
  ctx.fillRect(0, 0, dSize, dSize);

  // fg
  const avg = hash.reduce((sum, c) => sum + parseInt(c, 16), 0) / hash.length;
  ctx.fillStyle = fg || '#000';
  for (let i = 0; i < hash.length; i++) {
    if (parseInt(hash[i], 16) > avg) {
      const x = (i % 2) + 1;
      const y = Math.floor(i / 2) + 1;
      // left side
      ctx.fillRect(x * pSize, y * pSize, pSize, pSize);
      // right side
      ctx.fillRect((5 - x) * pSize, y * pSize, pSize, pSize);
    }
  }

  // resize to target size
  const targetCanvas = document.createElement('canvas');
  targetCanvas.width = size || 400;
  targetCanvas.height = size || 400;
  const targetCtx = targetCanvas.getContext('2d');

  if (!targetCtx) {
    throw new Error('Init target canvas context 2d error');
  }

  // disable smooth
  targetCtx.imageSmoothingEnabled = false;
  targetCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, targetCanvas.width, targetCanvas.height);

  // get base64 url
  const base64 = targetCanvas.toDataURL('image/jpeg');

  // release canvas memory usage
  releaseCanvas(ctx, canvas);
  releaseCanvas(targetCtx, targetCanvas);

  return base64;
};
