import { useEffect, useState } from 'react'
import type { SpriteConfig } from '../../data/sprites'

interface Props {
  config: SpriteConfig
  scale?: number
  onComplete?: () => void
}

export function Sprite({ config, scale = 1.25, onComplete }: Props) {
  const {
    src,
    frameW,
    frameH,
    cols,
    frameCount,
    fps,
    startFrame = 0,
    cropTop = 0,
    cropBottom = 0,
    loop = true
  } = config
  const [frame, setFrame] = useState(startFrame)

  const displayW = frameW * scale
  const displayH = (frameH - cropTop - cropBottom) * scale
  const sheetW = frameW * cols * scale

  useEffect(() => {
    setFrame(startFrame)
    const lastFrame = startFrame + frameCount - 1
    const id = setInterval(() => {
      setFrame((f) => {
        if (f >= lastFrame) {
          if (!loop) {
            clearInterval(id)
            onComplete?.()
            return lastFrame
          }
          return startFrame
        }
        return f + 1
      })
    }, 1000 / fps)
    return () => clearInterval(id)
  }, [src, frameCount, fps, startFrame, loop, onComplete])

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
        imageRendering: 'pixelated',
        overflow: 'hidden'
      }}
    />
  )
}
