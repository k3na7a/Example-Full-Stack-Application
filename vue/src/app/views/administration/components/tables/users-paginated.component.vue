<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import moment from 'moment'

import { PaginationDto, PaginationMeta, PaginationOptions } from '@/apis/localhost/dto/pagination.dto'
import { UserDto } from '@/apis/localhost/dto/user.dto'

import TablePaginatedComponent from '@/app/components/table/paginated.component.vue'

import { defaultOptions, tableColumns, sort, badges } from '../../config/user-list.config'
import { UserService } from '../../services/user.service'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const { getUsersPaginated, updateUser, deleteUser } = UserService

const loading = ref<boolean>(true)
const options = reactive<PaginationOptions>(defaultOptions)
const response = reactive<{ data: Array<UserDto>; meta: PaginationMeta }>({
  data: [],
  meta: new PaginationMeta({ pageOptions: defaultOptions, itemCount: 0 })
})

async function getPaginatedData(payload: PaginationOptions): Promise<void> {
  loading.value = true

  await getUsersPaginated(payload)
    .then((res: PaginationDto<UserDto>) => {
      response.data = res.data
      response.meta = res.meta
    })
    .finally(() => (loading.value = false))
}

await getPaginatedData(defaultOptions)
watch(options, async (newVal: PaginationOptions): Promise<void> => {
  await getPaginatedData(newVal)
})
</script>

<template>
  <TablePaginatedComponent
    v-model:options="options"
    :loading
    :columns="tableColumns"
    :rows="response.data"
    :pages="response.meta?.pageCount"
    :sort-options="sort"
    :caption="t('administration.users.caption', { showing: response.data.length }, response.meta.itemCount)"
  >
    <template v-slot>
      <button class="btn btn-dark btn-icon" disabled type="button">
        <font-awesome-icon size="lg" :icon="['fas', 'ellipsis-vertical']" />
      </button>
    </template>
    <template #user="{ row }">
      <div class="d-flex align-items-center gap-2">
        <img class="avatar-icon rounded-circle" :src="row.profile.avatar" />

        <div class="d-flex flex-column flex-grow-1">
          <p class="text-light fw-semibold">
            {{ row.getFullName() }}
          </p>
          <small>{{ row.email }}</small>
        </div>
      </div>
    </template>

    <template #created="{ row }">
      {{ moment(row.createdAt).fromNow() }}
    </template>

    <template #role="{ row }">
      <div class="border d-flex align-items-center" :class="{ 'border-info text-info': badges[row.role].theme }">
        <div class="px-2 d-flex align-items-center text-nowrap">
          <small class="fw-bold text-truncate">
            {{ $t(badges[row.role].label).toUpperCase() }}
          </small>
        </div>
      </div>
    </template>

    <template #actions="{ row }">
      <div class="d-flex gap-1 flex-nowrap">
        <button
          v-tooltip="{ text: $t('actions.update'), position: 'bottom', trigger: 'hover' }"
          class="btn btn-dark btn-icon-sm px-0"
          type="button"
          @click="(_: MouseEvent) => updateUser(row, (_: UserDto) => { getPaginatedData(options) })"
        >
          <div class="d-flex flex-column align-items-center text-warning">
            <font-awesome-icon size="sm" :icon="['fas', 'pencil']" />
          </div>
        </button>
        <button
          v-tooltip="{ text: $t('actions.delete'), position: 'bottom', trigger: 'hover' }"
          class="btn btn-dark btn-icon-sm px-0"
          type="button"
          @click="(_: MouseEvent) => deleteUser(row)"
        >
          <div class="d-flex flex-column align-items-center text-danger">
            <font-awesome-icon size="sm" :icon="['fas', 'trash-can']" />
          </div>
        </button>
      </div>
    </template>
  </TablePaginatedComponent>
</template>
