import React from 'react'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import { container } from '@anims/music'
import * as S from '@components/Music/Music.style'
import Square from './Square'

import { Track } from '@prisma/client'
import { userWithLikes } from '@typings/index'
import data, { Category } from '@samples/music'

import { IoHeart, IoHeartOutline, IoShuffle } from 'react-icons/io5'

const Board: React.FC<{ track: Track; user: userWithLikes }> = ({
  track,
  user,
}) => {
  const router = useRouter()

  if (
    track.sounds &&
    typeof track.sounds === 'object' &&
    Array.isArray(track.sounds)
  ) {
    const categories = track.sounds as Array<
      Pick<Category, 'playing' | 'volume'>
    >

    data.forEach((sound, index) => {
      sound.playing = categories[index]!.playing
      sound.volume = categories[index]!.volume
    })
  }

  const likedPost = user?.likes?.filter((like) => like.trackSlug == track.slug)
  const [liked, setLiked] = React.useState(likedPost?.length > 0 ? true : false)

  const { data: session, status } = useSession()

  return (
    <S.MusicContainer margin>
      <S.TrackTitle>{track.title}</S.TrackTitle>
      <S.TrackOptions>
        <S.Option margin href={`/remix/${track.slug}`}>
          <IoShuffle size={30} />
          Remix
        </S.Option>
        <S.Option
          className={liked ? 'active' : ''}
          onClick={async () => {
            if (session) {
              let headers = new Headers()
              headers.append('Content-Type', 'application/json')

              const body = JSON.stringify({
                slug: track.slug,
                removing: liked ? true : false,
              })

              const requestOptions = {
                method: 'POST',
                headers: headers,
                body: body,
              }

              await fetch('/api/like', requestOptions)
                .then((response) => response.text())
                .then((result) => result)
                .catch((error) => console.log('error', error))

              setLiked((liked) => !liked)
            } else router.push(`/login`)
          }}
          unactive={liked ? false : true}
        >
          {liked ? 'Liked' : 'Like'}
          {liked ? <IoHeart size={30} /> : <IoHeartOutline size={30} />}
        </S.Option>
      </S.TrackOptions>
      <S.MusicGrid
        variants={container}
        initial='hidden'
        animate='visible'
        margin
      >
        {data?.map((category, i) => (
          <Square category={category} key={i} />
        ))}
      </S.MusicGrid>
    </S.MusicContainer>
  )
}

export default Board
