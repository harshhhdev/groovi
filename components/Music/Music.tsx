import React from 'react'

import { container } from '@anims/music'

import * as S from './Music.style'
import {
  EmptyContainer,
  EmptyText,
  Bottom,
} from '@components/Profile/Profile.style'

import SaveModal from './Save'
import Square from './Square'

import categories from './Categories'
import { IconType } from 'react-icons/lib'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export const filter = (
  options: { name: string; icon: IconType }[] | undefined,
  query: string
) => {
  if (!query) return options

  return options?.filter((option: { name: string; icon: IconType }) => {
    const optionText = option.name.toLowerCase()
    return optionText.includes(query.toLowerCase())
  })
}

const Music: React.FC<{ query: string }> = ({ query }) => {
  const router = useRouter()
  const { data: session, status } = useSession()

  let filteredResults = filter(categories, query)
  const [open, setOpen] = React.useState(false)

  return (
    <S.MusicContainer>
      {filteredResults!.length <= 0 ? (
        <EmptyContainer>
          <EmptyText>No Sounds Found 😭</EmptyText>
          <Bottom>
            Want a sound to be added?{' '}
            <a href='https://github.com/harshhhdev/groovi'>Open an issue</a>
          </Bottom>
        </EmptyContainer>
      ) : (
        <S.MusicGrid variants={container} initial='hidden' animate='visible'>
          {filteredResults!.map((category, i) => (
            <Square category={category} key={i} index={i} />
          ))}
        </S.MusicGrid>
      )}
      <S.Button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.8 }}
        onClick={() => (session ? setOpen(true) : router.push('/login'))}
      >
        Publish Track
      </S.Button>
      <SaveModal open={open} setOpen={setOpen} remix={false} />
    </S.MusicContainer>
  )
}

export default Music
