import { AxiosError } from 'axios'
import { markRaw } from 'vue'

import { PaginationOptions, PaginationDto, PaginationMeta } from '@/library/data/dto/pagination.dto'
import { LocalhostAPI } from '@/library/apis/localhost/localhost.api'
import { ModalStore, useModalStore } from '@/app/components/modal/store/modal.store'
import { ToastStore, useToastStore } from '@/app/components/toast/store/toast.store'

import PlatformModal from '../components/modals/platform.modal.vue'
import ConfirmModal from '@/app/components/modal/templates/confirm.modal.vue'
import { PlatformDto, iplatform, CreatePlatformDto } from '@/library/data/dto/games/platform.dto'

class PlatformService {
  public static create(success?: (value: PlatformDto) => void): void {
    const { openModal, closeModal }: ModalStore = useModalStore()
    const { addToast }: ToastStore = useToastStore()

    openModal({
      view: markRaw(PlatformModal),
      properties: {
        title: 'administration.game-library.platforms.create.title',
        action: 'actions.create-platform',
        callback: async (values: iplatform) => {
          await LocalhostAPI.administration.game_library.platforms
            .create(new CreatePlatformDto(values))
            .then((value: PlatformDto) => {
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

  public static async getAll(): Promise<Array<PlatformDto>> {
    const { addToast }: ToastStore = useToastStore()
    return LocalhostAPI.administration.game_library.platforms.getAll().catch((error: AxiosError) => {
      addToast({ title: error.response?.statusText || 'ERROR', body: error.message, options: { theme: 'danger' } })
      return []
    })
  }

  public static async getPaginated(params: PaginationOptions): Promise<PaginationDto<PlatformDto>> {
    const { addToast }: ToastStore = useToastStore()
    return LocalhostAPI.administration.game_library.platforms.getPaginated(params).catch((error: AxiosError) => {
      addToast({ title: error.response?.statusText || 'ERROR', body: error.message, options: { theme: 'danger' } })
      return { data: [], meta: new PaginationMeta({ pageOptions: params, itemCount: 0 }) }
    })
  }

  public static update(platform: PlatformDto, success?: (value: PlatformDto) => void): void {
    const { openModal, closeModal }: ModalStore = useModalStore()
    const { addToast }: ToastStore = useToastStore()

    openModal({
      view: markRaw(PlatformModal),
      properties: {
        platform,
        title: 'administration.game-library.platforms.update.title',
        action: 'actions.update-platform',
        callback: async (values: any) => {
          await LocalhostAPI.administration.game_library.platforms
            .update(platform.id, new CreatePlatformDto(values))
            .then((value: PlatformDto) => {
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

  public static remove(platform: PlatformDto, success?: (value: PlatformDto) => void): void {
    const { openModal, closeModal }: ModalStore = useModalStore()
    const { addToast }: ToastStore = useToastStore()

    openModal({
      view: markRaw(ConfirmModal),
      properties: {
        close: closeModal,
        callback: async (): Promise<void> => {
          await LocalhostAPI.administration.game_library.platforms
            .remove(platform.id)
            .then((value: PlatformDto) => {
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
        item: platform.name,
        title: 'administration.game-library.platforms.delete.title',
        body: 'administration.game-library.platforms.delete.body',
        action: 'actions.delete-platform'
      }
    })
  }
}

export { PlatformService }
