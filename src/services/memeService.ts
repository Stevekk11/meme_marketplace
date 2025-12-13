import { get } from './apiClient'
import type { Meme, MemeCategory } from '../types/meme'

const CATEGORIES: MemeCategory[] = ['animals', 'celebrities', 'gaming', 'school', 'random']

function getRandomCategory(): MemeCategory {
  const index = Math.floor(Math.random() * CATEGORIES.length)
  return CATEGORIES[index]
}

function getRandomRating(): 1 | 2 | 3 | 4 | 5 {
  return (Math.floor(Math.random() * 5) + 1) as 1 | 2 | 3 | 4 | 5
}

interface ImgflipApiResponse {
  success: boolean
  data: {
    memes: Array<{
      id: string
      name: string
      url: string
      width: number
      height: number
      box_count: number
    }>
  }
}

export async function getMemes(): Promise<Meme[]> {
  const response = await get<ImgflipApiResponse>('https://api.imgflip.com/get_memes')
  if (!response.success) {
    throw new Error('Failed to load memes')
  }

  return response.data.memes.map((meme) => ({
    id: meme.id,
    name: meme.name,
    url: meme.url,
    width: meme.width,
    height: meme.height,
    boxCount: meme.box_count,
    rating: getRandomRating(),
    category: getRandomCategory(),
  }))
}

export async function getMemeById(id: string): Promise<Meme | null> {
  const memes = await getMemes()
  return memes.find((meme) => meme.id === id) ?? null
}

