import React from 'react'

import { item } from '@anims/music'
import * as S from '@components/Music/Music.style'

import { IconType } from 'react-icons/lib'
import { Category } from '@samples/music'

const Square: React.FC<{
  category: { name: string; icon: IconType; playing: boolean; volume: number }
  index: number
  data: Category[]
}> = ({ category, index, data }) => {
  const audioRef = React.useRef<HTMLAudioElement>(null)
  const volumeRef = React.useRef<HTMLInputElement>(null)

  const [volume, setVolume] = React.useState(category.volume)
  const [active, setActive] = React.useState(category.playing)

  const Toggle = () => {
    setActive((active) => !active)
    data[index].playing = !data[index].playing
  }

  const ToggleVolume = () => {
    const intVolume = parseInt(volumeRef.current?.value!)
    setVolume(intVolume)
    data[index].volume = intVolume
  }

  React.useEffect(() => {
    active ? audioRef.current?.play() : audioRef.current?.pause()
  }, [active, setActive])

  React.useEffect(() => {
    audioRef.current!.volume = volume / 100
  }, [volume, setVolume])

  React.useEffect(() => {
    category.playing ? audioRef.current!.play() : audioRef.current?.pause()
  }, [])

  return (
    <S.AudioBox
      aria-label={category.name}
      className={active ? 'playing' : ''}
      variants={item}
    >
      <S.AudioController loop ref={audioRef}>
        <source src={`/${category.name.toLowerCase()}.mp3`} type='audio/mp3' />
      </S.AudioController>
      <S.BoxMain onClick={Toggle}>
        <category.icon />
        <S.AudioText>{category.name}</S.AudioText>
      </S.BoxMain>
      <S.BarContainer
        style={{ display: active ? 'flex' : 'none' }}
        onClick={() => (active ? '' : Toggle)}
      >
        <S.Bar
          type='range'
          min={0}
          max={100}
          onChange={ToggleVolume}
          ref={volumeRef}
          defaultValue={volume}
        />
      </S.BarContainer>
    </S.AudioBox>
  )
}

export default Square
