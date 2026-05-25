import { useEffect, useState } from 'react'
import type { SpriteConfig } from '../../data/sprites'

interface Props {
  config: SpriteConfig
  scale?: number
}

export function Sprite({ config, scale = 1.25 }: Props) {
  const { src, frameW, frameH, cols, frameCount, fps, startFrame = 0, cropTop = 0 } = config
  const [frame, setFrame] = useState(startFrame)

  const displayW = frameW * scale
  const displayH = (frameH - cropTop) * scale
  const sheetW = frameW * cols * scale

  useEffect(() => {
    setFrame(startFrame)
    const id = setInterval(() => {
      setFrame((f) => {
        const next = f + 1
        return next >= startFrame + frameCount ? startFrame : next
      })
    }, 1000 / fps)
    return () => clearInterval(id)
  }, [src, frameCount, fps, startFrame])

  const col = frame % cols
  const row = Math.floor(frame / cols)

  return (
    <div
      style={{
        width: displayW,
        height: displayH,
        backgroundImage: `url(${src})`,
        backgroundSize: `${sheetW}px auto`,
        backgroundPosition: `${-(col * displayW)}px ${-(row * frameH * scale + cropTop * scale)}px`,
        backgroundRepeat: 'no-repeat',
        imageRendering: 'pixelated'
      }}
    />
  )
}
