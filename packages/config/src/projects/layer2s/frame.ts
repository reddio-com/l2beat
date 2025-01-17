import { UnixTime } from '@l2beat/shared-pure'
import { upcomingL2 } from './templates/upcoming'
import { Layer2 } from './types'

export const frame: Layer2 = upcomingL2({
  id: 'frame', // 'Frame team bought by Igloo Inc. in June 2024. Will contricute to Abstract network. Links no longer work'
  createdAt: new UnixTime(1695904849), // 2023-09-28T12:40:49Z
  display: {
    name: 'Frame',
    slug: 'frame',
    description:
      'Frame is an Ethereum L2 designed to scale NFT adoption across the Ethereum ecosystem utilizing Arbitrum Nitro technology.',
    purposes: ['Universal', 'NFT'],
    category: 'Optimistic Rollup',
    provider: 'Arbitrum',
    links: {
      websites: ['https://frame.xyz/'],
      apps: [],
      documentation: ['https://docs.frame.xyz/'],
      explorers: ['https://explorer.testnet.frame.xyz/'],
      repositories: ['https://github.com/frame-network'],
      socialMedia: [
        'https://twitter.com/frame_xyz',
        'https://discord.gg/framexyz',
      ],
    },
  },
})
