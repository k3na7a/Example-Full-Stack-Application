import { AxiosError } from 'axios'

import { CreateGenreDto, GenreDto } from '@/apis/localhost/dto/game-library.dto'
import { PaginationOptions, PaginationDto, PaginationMeta } from '@/apis/localhost/dto/pagination.dto'
import { LocalhostAPI } from '@/apis/localhost/localhost.api'
import { ToastStore, useToastStore } from '@/app/store/toast.store'
import { ModalStore, useModalStore } from '@/app/store/modal.store'
import { markRaw } from 'vue'

import GenreModal from '../components/genre.modal.vue'
import ConfirmModal from '@/app/components/modal/confirm.modal.vue'

class GenreService {
  public static create(success?: (value: GenreDto) => void): void {
    const { openModal, closeModal }: ModalStore = useModalStore()
    const { addToast }: ToastStore = useToastStore()

    openModal({
      view: markRaw(GenreModal),
      properties: {
        title: 'Create new Genre',
        action: 'Create Genre',
        callback: async (values: any) => {
          LocalhostAPI.administration.game_library.genres
            .create(new CreateGenreDto(values))
            .then((value: GenreDto) => {
              if (success) success(value)
              closeModal()
            })
            .catch((error: AxiosError) => {
              addToast({
                title: error.response?.statusText || 'ERROR',
                body: error.message,
                options: { theme: 'danger' }
              })
            })
        }
      }
    })
  }

  public static update(genre: GenreDto, success?: (value: GenreDto) => void): void {
    const { openModal, closeModal }: ModalStore = useModalStore()
    const { addToast }: ToastStore = useToastStore()

    openModal({
      view: markRaw(GenreModal),
      properties: {
        genre,
        callback: async (values: any) => {
          LocalhostAPI.administration.game_library.genres
            .update(genre.id, new CreateGenreDto(values))
            .then((value: GenreDto) => {
              if (success) success(value)
              closeModal()
            })
            .catch((error: AxiosError) => {
              addToast({
                title: error.response?.statusText || 'ERROR',
                body: error.message,
                options: { theme: 'danger' }
              })
            })
        }
      }
    })
  }

  public static async getPaginated(params: PaginationOptions): Promise<PaginationDto<GenreDto>> {
    const { addToast }: ToastStore = useToastStore()
    return LocalhostAPI.administration.game_library.genres.getPaginated(params).catch((error: AxiosError) => {
      addToast({ title: error.response?.statusText || 'ERROR', body: error.message, options: { theme: 'danger' } })
      return { data: [], meta: new PaginationMeta({ pageOptions: params, itemCount: 0 }) }
    })
  }

  public static async getAll(): Promise<Array<GenreDto>> {
    const { addToast }: ToastStore = useToastStore()
    return LocalhostAPI.administration.game_library.genres.getAll().catch((error: AxiosError) => {
      addToast({ title: error.response?.statusText || 'ERROR', body: error.message, options: { theme: 'danger' } })
      return []
    })
  }

  public static remove(genre: GenreDto, success?: (value: GenreDto) => void): void {
    const { openModal, closeModal }: ModalStore = useModalStore()
    const { addToast }: ToastStore = useToastStore()

    openModal({
      view: markRaw(ConfirmModal),
      properties: {
        close: closeModal,
        callback: async (): Promise<void> => {
          LocalhostAPI.administration.game_library.genres
            .remove(genre.id)
            .then((value: GenreDto) => {
              if (success) success(value)
              closeModal()
            })
            .catch((error: AxiosError) => {
              addToast({
                title: error.response?.statusText || 'ERROR',
                body: error.message,
                options: { theme: 'danger' }
              })
            })
        },
        title: `Remove ${genre.name}`,
        body: `Are you sure you want to remove ${genre.name}?`,
        action: 'Remove Genre'
      }
    })
  }
}

export { GenreService }