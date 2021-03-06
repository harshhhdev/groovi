import { styled } from '@stitches/react'
import { motion } from 'framer-motion'

import WavyText from '@anims/WavyText'

export const Container = styled(motion.div, {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  margin: '0 0 200px 150px',
  // NOTE: for some reason @iPhonePlus isn't working?
  '@media screen and (max-width: 425px)': {
    margin: '0px',
    alignItems: 'center',
  },
  variants: {
    main: {
      true: {
        marginTop: 200,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        '@media screen and (max-width: 425px)': {
          flexDirection: 'column',
        },
      },
    },
  },
})

export const Grid = styled(motion.div, {
  display: 'grid',
  gap: 30,
  gridTemplateColumns: '410px 450px',
  gridTemplateRows: 'auto',
  justifyContent: 'center',
  marginLeft: 200,
  '@media screen and (max-width: 425px)': {
    gridTemplateColumns: '300px',
    marginLeft: 0,
    marginTop: 100,
  },
})

export const Avatar = styled(motion.img, {
  width: 200,
  height: 200,
  borderRadius: '100%',
})

export const Name = styled(WavyText, {
  fontSize: '$6',
  color: '$primary',
  margin: '30px 0 20px 0',
})

export const Username = styled(WavyText, {
  fontSize: '$4',
  color: '$black10',
})

export const TrackContainer = styled(motion.a, {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  width: 400,
  height: 200,
  background: '$fg',
  color: '$primary',
  borderRadius: 12,
  padding: 30,
  textDecoration: 'none',
  border: '$fg 2px solid',
  transition: '0.1s linear',
  '&:hover': {
    border: '$main 2px solid',
  },
  '@media screen and (max-width: 425px)': { width: 300 },
})

export const TrackTitle = styled('h1', {
  color: '$primary',
  fontSize: '$4',
  overflow: 'hidden',
  width: '90%',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

export const BottomContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
})

export const InfoContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '$3',
  svg: {
    marginRight: 5,
  },
})

export const EmptyContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '50vh',
  '@media only screen and (max-width: 425px)': { textAlign: 'center' },
})

export const EmptyText = styled('h1', {
  color: '$primary',
  fontSize: '$6',
})

export const Bottom = styled('p', {
  color: '$primary',
  fontSize: '$3',
  marginTop: 20,
  a: {
    color: '$main',
    textDecoration: 'none',
  },
})
