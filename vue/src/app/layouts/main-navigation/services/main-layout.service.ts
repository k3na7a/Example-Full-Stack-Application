import { markRaw } from 'vue'
import { AxiosError } from 'axios'

import SignInModal from '@/library/components/modal/templates/signin-modal.component.vue'
import RegisterModal from '@/library/components/modal/templates/register-modal.component.vue'
import ConfirmationModal from '@/library/components/modal/templates/confirm.modal.vue'

import { ModalStore, useModalStore } from '@/library/components/modal/store/modal.store'
import { AuthStore, useAuthStore } from '@/app/store/authentication.store'
import { ToastStore, useToastStore } from '@/library/components/toast/store/toast.store'

import { Register, RegisterDto } from '@/library/data/dto/user/user.dto'
import { credentials } from '@/library/data/dto/authentication/JWT.dto'

class MainLayoutService {
  public static signin = (): void => {
    const { openModal, closeModal }: ModalStore = useModalStore()
    const { signIn }: AuthStore = useAuthStore()
    const { addToast }: ToastStore = useToastStore()

    openModal({
      view: markRaw(SignInModal),
      properties: {
        callback: async (values: credentials): Promise<void> => {
          signIn(values)
            .then(closeModal)
            .catch((error: AxiosError) =>
              addToast({
                title: error.response?.statusText || 'ERROR',
                body: error.message,
                options: { theme: 'danger' }
              })
            )
        }
      }
    })
  }

  public static register = (): void => {
    const { openModal, closeModal }: ModalStore = useModalStore()
    const { register }: AuthStore = useAuthStore()
    const { addToast }: ToastStore = useToastStore()

    openModal({
      view: markRaw(RegisterModal),
      properties: {
        callback: async (values: Register): Promise<void> => {
          register(new RegisterDto(values))
            .then(closeModal)
            .catch((error: AxiosError) =>
              addToast({
                title: error.response?.statusText || 'ERROR',
                body: error.message,
                options: { theme: 'danger' }
              })
            )
        }
      }
    })
  }

  public static signout = (): void => {
    const { openModal, closeModal }: ModalStore = useModalStore()
    const { signOut }: AuthStore = useAuthStore()
    const { addToast }: ToastStore = useToastStore()

    openModal({
      view: markRaw(ConfirmationModal),
      properties: {
        close: closeModal,
        callback: async (): Promise<void> => {
          await signOut()
            .then(closeModal)
            .catch((error: AxiosError) =>
              addToast({
                title: error.response?.statusText || 'ERROR',
                body: error.message,
                options: { theme: 'danger' }
              })
            )
        },
        title: 'authentication.log-out.modal-title',
        body: 'authentication.log-out.modal-body',
        action: 'actions.log-out'
      }
    })
  }
}

export { MainLayoutService }
