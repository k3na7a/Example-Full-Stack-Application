import { GenreDto, PlatformDto } from '@/apis/localhost/dto/game-library.dto'
import * as Yup from 'yup'

const platform = Yup.object().shape({
  name: Yup.string().required(),
  release_date: Yup.date().required(),
  abbreviation: Yup.string().required(),
  slug: Yup.string().required()
})

const genre = Yup.object().shape({
  name: Yup.string().required(),
  slug: Yup.string().required()
})

const game = Yup.object().shape({
  name: Yup.string().required(),
  cover: Yup.mixed<File>().notRequired(),
  platforms: Yup.array<PlatformDto>().optional(),
  genres: Yup.array<GenreDto>().optional(),
  release_date: Yup.date().required(),
  slug: Yup.string().required()
})

export { platform, game, genre }