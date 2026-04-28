'use client'

import { useState, useEffect } from 'react'

const avatarCache = new Map<string, string>()

const PLACEHOLDER = '/avatar-fallback.svg'

function buildSources(username: string, size: number): string[] {
  const encoded = encodeURIComponent(username)
  return [
    `https://mc-heads.net/avatar/${encoded}/${size}`,
    `https://crafthead.net/avatar/${encoded}/${size}`,
    PLACEHOLDER,
  ]
}

interface PlayerAvatarProps {
  username: string
  size: number
  className?: string
}

export default function PlayerAvatar({ username, size, className }: PlayerAvatarProps) {
  const cacheKey = `${username}:${size}`

  const [src, setSrc] = useState<string>(() => {
    const sources = buildSources(username, size)
    return avatarCache.get(cacheKey) ?? sources[0]
  })

  // Reset when username or size changes (component reuse without unmount)
  useEffect(() => {
    const sources = buildSources(username, size)
    setSrc(avatarCache.get(cacheKey) ?? sources[0])
  }, [cacheKey]) // eslint-disable-line react-hooks/exhaustive-deps

  function handleError() {
    const sources = buildSources(username, size)
    // Invalidate stale cache entry if the failing URL was cached
    if (avatarCache.get(cacheKey) === src) {
      avatarCache.delete(cacheKey)
    }
    const currentIndex = sources.indexOf(src)
    const next = currentIndex >= 0 ? currentIndex + 1 : sources.length - 1
    if (next < sources.length) {
      setSrc(sources[next])
    }
  }

  function handleLoad() {
    if (src !== PLACEHOLDER) {
      avatarCache.set(cacheKey, src)
    }
  }

  return (
    <img
      src={src}
      alt={username}
      width={size}
      height={size}
      className={className}
      loading="lazy"
      onError={handleError}
      onLoad={handleLoad}
    />
  )
}
