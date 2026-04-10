'use client'

import { useEffect, useState, useRef } from 'react'
import styles from '../home.module.css'
import { TEAM_MEMBERS, TeamMember } from './constants'

function SkinPeek({ skin, side, offsetY }: { skin: TeamMember; side: 'left' | 'right'; offsetY: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<any>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!canvasRef.current) return

    let mounted = true

    import('skinview3d').then(({ SkinViewer }) => {
      if (!mounted || !canvasRef.current) return

      const viewer = new SkinViewer({
        canvas: canvasRef.current,
        width: 160,
        height: 300,
      })
      
      viewer.renderer.setClearColor(0x000000, 0)

      viewer.camera.position.set(side === 'left' ? 8 : -8, 2, 20)
      viewer.camera.lookAt(0, 2, 0)
      viewer.autoRotate = false
      viewer.zoom = 0.95

      if (viewer.playerObject) {
        viewer.playerObject.rotation.y = side === 'left' ? 0.5 : -0.5
        viewer.playerObject.position.y = -8
        
        const skinObj = viewer.playerObject.skin
        if (skinObj) {
          if (skinObj.rightArm) {
            skinObj.rightArm.rotation.x = -1.2
            skinObj.rightArm.rotation.z = side === 'left' ? -0.8 : 0.5
          }
          if (skinObj.leftArm) {
            skinObj.leftArm.rotation.x = -1.2
            skinObj.leftArm.rotation.z = side === 'left' ? -0.5 : 0.8
          }
        }
      }

      viewerRef.current = viewer
      
      viewer.loadSkin(`https://mc-heads.net/skin/${skin.username}`).then(() => {
        if (!mounted) return
        setIsLoaded(true)
        setTimeout(() => setIsVisible(true), 300 + Math.random() * 500)
      })
    })

    const handleBeforeUnload = () => {
      if (canvasRef.current) {
        canvasRef.current.style.visibility = 'hidden'
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      mounted = false
      window.removeEventListener('beforeunload', handleBeforeUnload)
      if (canvasRef.current) {
        canvasRef.current.style.visibility = 'hidden'
      }
      if (viewerRef.current) {
        viewerRef.current.dispose()
      }
    }
  }, [skin.username, side])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!viewerRef.current?.playerObject) return

      const centerX = side === 'left' ? 0 : window.innerWidth
      const centerY = window.innerHeight / 2

      const deltaX = (e.clientX - centerX) / window.innerWidth
      const deltaY = (e.clientY - centerY) / window.innerHeight

      const skinObj = viewerRef.current.playerObject.skin
      if (skinObj?.head) {
        skinObj.head.rotation.y = side === 'left' ? deltaX * 1.5 : deltaX * 1.5 - 0.3
        skinObj.head.rotation.x = deltaY * 0.8
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [side])

  return (
    <div
      ref={containerRef}
      className={`${styles.skinPeek} ${styles[`skinPeek${side === 'left' ? 'Left' : 'Right'}`]} ${isVisible ? styles.skinPeekVisible : ''}`}
      style={{ '--peek-offset-y': `${offsetY}px` } as React.CSSProperties}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas ref={canvasRef} className={styles.skinPeekCanvas} style={{ opacity: isLoaded ? 1 : 0 }} />
      <div 
        className={`${styles.skinPeekInfo} ${styles[`skinPeekInfo${side === 'left' ? 'Left' : 'Right'}`]} ${isHovered ? styles.skinPeekInfoVisible : ''}`}
        style={{ '--skin-color': skin.color } as React.CSSProperties}
      >
        <span className={styles.skinPeekTag}>{skin.tag}</span>
        <span className={styles.skinPeekName}>{skin.name}</span>
        <span className={styles.skinPeekRole}>{skin.role}</span>
      </div>
    </div>
  )
}

export function SkinPeekGroup() {
  const [config, setConfig] = useState<{ skin: TeamMember; side: 'left' | 'right'; offsetY: number } | null>(null)

  useEffect(() => {
    const skin = TEAM_MEMBERS[Math.floor(Math.random() * TEAM_MEMBERS.length)]
    const side = Math.random() > 0.5 ? 'left' : 'right'
    const offsetY = (Math.random() - 0.5) * 200
    setConfig({ skin, side, offsetY })
  }, [])

  if (!config) return null

  return <SkinPeek skin={config.skin} side={config.side} offsetY={config.offsetY} />
}
