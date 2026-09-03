import { useEffect, useRef, useState } from 'react'

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\/[]{}=+*^?#01'

// 한글 음절은 폰트에서 항상 전각(고정폭)이고, 라틴 대문자끼리도 폭이 서로 비슷해서
// 완성될 글자와 같은 부류(한글/라틴)로만 섞으면 기호가 섞일 때 생기는 줄 전체 흔들림이 없어진다
const HANGUL_SCRAMBLE = '가나다라마바사아자차카타파하거너더러머버서어저처커터퍼허고노도로모보소오조초코토포호'
const LATIN_SCRAMBLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const isHangul = (char) => /[가-힣]/.test(char)

const randomCharFor = (targetChar) => {
  const pool = isHangul(targetChar) ? HANGUL_SCRAMBLE : LATIN_SCRAMBLE
  return pool[Math.floor(Math.random() * pool.length)]
}

const scrambleOnce = (text, widthStable) =>
  text
    .split('')
    .map((char) => {
      if (char === ' ') return ' '
      return widthStable ? randomCharFor(char) : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
    })
    .join('')

// 글자마다 확정되는 시점을 조금씩 어긋나게 둬서, 앞에서부터 순서대로 자리 잡는 것처럼 보이게 함
// startDelay가 지나기 전에도 암호처럼 계속 뒤섞이도록 두고, 지난 뒤부터 순서대로 확정시킴
// stableWidth: 완성될 글자와 같은 부류(한글/라틴)의 문자로만 섞어서, 글자 폭이 요동치며
// 줄 전체가 흔들리는 걸 막는다 (자간을 인위적으로 고정하는 방식이 아니라 원래 폰트 자간 그대로 유지됨)
// easePower: 1이면 앞뒤 글자가 균등한 간격으로 확정됨. 1보다 크면 앞쪽은 빠르게,
// 뒤로 갈수록 확정 간격이 점점 벌어져서 느려지는 그라데이션 느낌을 줌
const ScrambleText = ({
  text,
  start = true,
  duration = 900,
  startDelay = 0,
  stableWidth = false,
  easePower = 1,
}) => {
  const [display, setDisplay] = useState(() => scrambleOnce(text, stableWidth))
  const isDone = useRef(false)

  useEffect(() => {
    if (!start || isDone.current) return

    let cancelled = false
    let frameId
    const length = text.length
    const lockAt = Array.from({ length }, (_, i) => Math.pow(i / length, easePower) * 0.7)
    const startTime = performance.now() + startDelay

    const tick = (now) => {
      if (cancelled) return
      const elapsed = now - startTime
      const isRunning = elapsed >= 0
      const progress = isRunning ? Math.min(elapsed / duration, 1) : 0

      let output = ''
      for (let i = 0; i < length; i++) {
        const char = text[i]
        if (char === ' ' || (isRunning && progress >= lockAt[i] + 0.3)) {
          output += char
        } else {
          output += stableWidth
            ? randomCharFor(char)
            : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
        }
      }
      setDisplay(output)

      if (isRunning && progress >= 1) {
        setDisplay(text)
        isDone.current = true
        return
      }
      frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)
    return () => {
      cancelled = true
      cancelAnimationFrame(frameId)
    }
  }, [start])

  return display
}

export default ScrambleText
