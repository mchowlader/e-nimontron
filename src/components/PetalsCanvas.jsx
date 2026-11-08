import React, { useEffect, useRef, useState } from 'react';

export default function PetalsCanvas() {
  const canvasRef = useRef(null);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Natural realistic rose petal colors (velvet red, ruby rose, blush pink & auspicious marigold)
    const petalPalettes = [
      // Deep Velvet Crimson Rose
      {
        base: '#800010',
        mid: '#ba1327',
        highlight: '#e63946',
        rim: 'rgba(255, 180, 190, 0.5)'
      },
      // Classic Royal Scarlet Rose
      {
        base: '#990012',
        mid: '#c9182b',
        highlight: '#f24357',
        rim: 'rgba(255, 200, 210, 0.45)'
      },
      // Soft Ruby & Pink Rose
      {
        base: '#ad1457',
        mid: '#d81b60',
        highlight: '#f06292',
        rim: 'rgba(255, 220, 230, 0.4)'
      },
      // Sacred Auspicious Saffron Marigold
      {
        base: '#d84315',
        mid: '#f57c00',
        highlight: '#ffb300',
        rim: 'rgba(255, 240, 180, 0.45)'
      }
    ];

    const count = window.innerWidth < 768 ? 22 : 36;
    const petals = [];

    for (let i = 0; i < count; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 14 + 18,     // 18 - 32px
        width: Math.random() * 11 + 14,      // 14 - 25px
        palette: petalPalettes[Math.floor(Math.random() * petalPalettes.length)],
        
        // Physics & 3D tumbling dynamics
        speedY: Math.random() * 1.2 + 0.8,
        speedX: Math.random() * 0.8 - 0.4,
        swayAngle: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.025 + 0.015,
        swayDistance: Math.random() * 1.4 + 0.8,
        
        // 3D rotation angles (fluttering like real falling petals)
        rotationZ: Math.random() * 360,
        spinSpeedZ: Math.random() * 1.6 - 0.8,
        flipAngle: Math.random() * Math.PI,
        flipSpeed: Math.random() * 0.03 + 0.02
      });
    }

    // Draws an authentic, curved, organic rose petal shape
    const drawRosePetal = (p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      
      // 3D orientation: Z-axis rotation + 3D flip (cos of flipAngle creates thickness contraction)
      ctx.rotate((p.rotationZ * Math.PI) / 180);
      const scaleX = Math.cos(p.flipAngle);
      const scaleY = 1.0;
      ctx.scale(scaleX, scaleY);

      const w = p.width * 0.5;
      const h = p.length * 0.5;

      // Realistic Radial Gradient for 3D velvety petal curvature
      const grad = ctx.createRadialGradient(-w * 0.2, -h * 0.3, w * 0.1, 0, 0, h * 1.1);
      grad.addColorStop(0, p.palette.highlight);
      grad.addColorStop(0.5, p.palette.mid);
      grad.addColorStop(1, p.palette.base);

      ctx.beginPath();
      // Natural organic rose petal silhouette:
      // Starts at the tapered base tip where it joins the flower
      ctx.moveTo(0, h * 0.85);
      // Left curved outer belly
      ctx.bezierCurveTo(-w * 1.2, h * 0.4, -w * 1.25, -h * 0.3, -w * 0.6, -h * 0.85);
      // Top gently cupped notch of rose petal
      ctx.bezierCurveTo(-w * 0.25, -h * 1.02, 0, -h * 0.95, w * 0.25, -h * 1.02);
      // Right curved outer belly
      ctx.bezierCurveTo(w * 1.25, -h * 0.3, w * 1.2, h * 0.4, 0, h * 0.85);
      ctx.closePath();

      // Soft petal shadow
      ctx.shadowColor = 'rgba(74, 7, 15, 0.35)';
      ctx.shadowBlur = 6;
      ctx.shadowOffsetY = 3;

      ctx.fillStyle = grad;
      ctx.fill();

      // Subtle delicate edge rim highlight (velvety light reflection)
      ctx.lineWidth = 0.6;
      ctx.strokeStyle = p.palette.rim;
      ctx.stroke();

      // Delicate subtle inner vein/contour curve of the petal
      ctx.beginPath();
      ctx.moveTo(0, h * 0.75);
      ctx.quadraticCurveTo(-w * 0.15, 0, 0, -h * 0.65);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
      ctx.lineWidth = 0.5;
      ctx.stroke();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      petals.forEach((p) => {
        p.swayAngle += p.swaySpeed;
        p.x += Math.sin(p.swayAngle) * p.swayDistance + p.speedX;
        p.y += p.speedY;

        p.rotationZ += p.spinSpeedZ;
        p.flipAngle += p.flipSpeed;

        // Wrap around smoothly when leaving screen
        if (p.y > height + 40) {
          p.y = -30;
          p.x = Math.random() * width;
        }
        if (p.x > width + 30) p.x = -30;
        if (p.x < -30) p.x = width + 30;

        drawRosePetal(p);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [enabled]);

  return (
    <>
      {enabled && (
        <canvas
          ref={canvasRef}
          className="pointer-events-none fixed inset-0 z-20"
        />
      )}
      <button
        onClick={() => setEnabled(!enabled)}
        title={enabled ? "পাপড়ি বন্ধ করুন" : "গোলাপের পাপড়ি চালু করুন"}
        className="fixed bottom-4 right-4 z-40 bg-vedic-maroonDark/90 hover:bg-vedic-maroon text-vedic-gold border border-vedic-gold/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs flex items-center gap-1.5 shadow-xl transition-all hover:scale-105"
      >
        <span>🌹</span>
        <span className="hidden sm:inline">{enabled ? "পাপড়ি প্রভাব বন্ধ" : "পাপড়ি প্রভাব চালু"}</span>
      </button>
    </>
  );
}
