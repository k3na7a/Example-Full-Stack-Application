<script setup lang="ts">
import { computed, ComputedRef, ref } from 'vue'
import { Form } from 'vee-validate'

import TextInput from '@/app/components/inputs/text.input.vue'

import { useFormUtil } from '@/utilities/forms.util.ts'
import { UpdateProfile, UserDto } from '@/apis/localhost/dto/user.dto.ts'
import { updateProfile as validationSchema } from '../config/schema/validation.schema.ts'
import { SettingsService } from '../services/settings.service.ts'
import { AuthStore, useAuthStore } from '@/app/store/authentication.store.ts'

const validateUtil = useFormUtil()
const authStore: AuthStore = useAuthStore()
const { updateProfile } = SettingsService

const user: ComputedRef<UserDto | undefined> = computed(() => authStore.authenticatedUser)
const loading = ref<boolean>(false)

const onSubmit = validateUtil.getSubmitFn(validationSchema, async (values: UpdateProfile) => {
  loading.value = true
  updateProfile(values).finally(() => (loading.value = false))
})
</script>

<template>
  <Form @submit="onSubmit" :validation-schema v-slot="{ meta }" :key="JSON.stringify(user?.updatedAt)">
    <div class="section d-flex flex-column gap-3 flex-sm-row p-3">
      <div class="row-header">
        <h6 class="fw-bold">{{ $t('forms.name') }}</h6>
      </div>

      <div class="d-flex flex-column flex-grow-1">
        <div class="row gy-2 align-items-start flex-grow-1">
          <div class="col-12 col-md-6 d-flex flex-column gap-1">
            <TextInput :value="user?.profile.name.first" autocomplete="given-name" name="firstname" type="text" />
            <small class="text-light-alt">{{ $t('forms.given-name') }}</small>
          </div>
          <div class="col-12 col-md-6 d-flex flex-column gap-1">
            <TextInput :value="user?.profile.name.last" autocomplete="family-name" name="lastname" type="text" />
            <small class="text-light-alt">{{ $t('forms.family-name') }}</small>
          </div>
        </div>
      </div>
    </div>
    <div class="section bg-alt d-flex flex-row p-3 justify-content-end">
      <button :disabled="!meta.valid || loading || !meta.dirty" class="btn btn-primary px-2" type="submit">
        {{ $t('actions.save-changes') }}
      </button>
    </div>
  </Form>
</template>
