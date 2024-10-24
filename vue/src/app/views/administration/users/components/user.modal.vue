<script setup lang="ts">
import { ref } from 'vue'
import { Form } from 'vee-validate'

import { Role, UpdateUser, UserDto } from '@/library/data/dto/user/user.dto'
import { useFormUtil } from '@/library/utilities/helpers/forms.util'
import { updateUser as validationSchema } from '../schema/validation.schema'

import TextInput from '@/library/components/inputs/text.input.vue'
import ModalTitleComponent from '@/library/components/modal/base/modal-title.component.vue'
import InputSelectComponent from '@/library/components/inputs/select.input.vue'
import InputFileComponent from '@/library/components/inputs/file.input.vue'
import CheckboxInput from '@/library/components/inputs/checkbox.input.vue'

const props = defineProps<{
  user: UserDto
  callback: (values: any) => Promise<void>
}>()

const loading = ref<boolean>(false)

const validateUtil = useFormUtil()
const onSubmit = validateUtil.getSubmitFn(validationSchema, async (values: UpdateUser) => {
  loading.value = true
  await props.callback(values).finally(() => {
    loading.value = false
  })
})
</script>

<template>
  <Form @submit="onSubmit" :validation-schema="validationSchema" v-slot="{ meta }">
    <div class="d-flex flex-column gap-3">
      <ModalTitleComponent :title="`Update ${user.getFullName()}`" />

      <div class="d-flex flex-column gap-1">
        <h6 class="fw-semibold">{{ $t('forms.name') }}</h6>
        <div class="row gy-3 align-items-start flex-grow-1">
          <div class="col-12 col-sm-6 d-flex flex-column gap-1">
            <TextInput :value="props.user.profile.name.first" autocomplete="given-name" name="firstname" type="text" />
            <small class="text-light-alt">{{ $t('forms.given-name') }}</small>
          </div>
          <div class="col-12 col-sm-6 d-flex flex-column gap-1">
            <TextInput :value="props.user.profile.name.last" autocomplete="family-name" name="lastname" type="text" />
            <small class="text-light-alt">{{ $t('forms.family-name') }}</small>
          </div>
        </div>
      </div>

      <div class="d-flex flex-column">
        <TextInput
          :label="$t('forms.email')"
          :value="props.user.email"
          autocomplete="email"
          name="email"
          type="email"
        />
      </div>

      <div class="d-flex flex-column gap-1">
        <h6 class="d-block fw-semibold">{{ $t('forms.role') }}</h6>
        <InputSelectComponent name="role" :value="user.role" :options="Object.values(Role)">
          <template #option="{ option }">
            {{ option }}
          </template>
        </InputSelectComponent>
      </div>

      <div class="d-flex flex-column gap-1">
        <h6 class="d-block fw-semibold">{{ $t('forms.profile-picture') }}</h6>
        <InputFileComponent name="avatar" />
      </div>

      <CheckboxInput name="remove-avatar" :value="false" label="Remove profile picture" />

      <div class="d-grid">
        <button :disabled="!meta.valid || !meta.dirty" class="btn btn-primary px-0" type="submit">
          <div v-if="true" class="containter">{{ $t('Update User') }}</div>
          <div v-else class="containter">{{ $t('actions.loading') }}</div>
        </button>
      </div>
    </div>
  </Form>
</template>
