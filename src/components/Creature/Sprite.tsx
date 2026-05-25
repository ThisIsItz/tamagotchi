import { useEffect, useState } from 'react'
import type { SpriteConfig } from '../../data/sprites'

interface Props {
  config: SpriteConfig
  scale?: number
}

export function Sprite({ config, scale = 1.25 }: Props) {
  const { src, frameW, frameH, cols, frameCount, fps } = config
  const [frame, setFrame] = useState(0)

  const displayW = frameW * scale
  const displayH = frameH * scale
  const sheetW = frameW * cols * scale

  useEffect(() => {
    setFrame(0)
    const id = setInterval(() => {
      setFrame((f) => (f + 1) % frameCount)
    }, 1000 / fps)
    return () => clearInterval(id)
  }, [src, frameCount, fps])

  const col = frame % cols
  const row = Math.floor(frame / cols)

  return (
    <div
      style={{
        width: displayW,
        height: displayH,
        backgroundImage: `url(${src})`,
        backgroundSize: `${sheetW}px auto`,
        backgroundPosition: `${-(col * displayW)}px ${-(row * displayH)}px`,
        backgroundRepeat: 'no-repeat',
        imageRendering: 'pixelated'
      }}
    />
  )
}
