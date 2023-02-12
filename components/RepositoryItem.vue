<template>
  <div class="px-10 py-5 m-1 bg-gray-100 border-2 border-gray-800 rounded-md">
    <a class="text-xl font-medium text-gray-900 text-blue-900 font-lg hover:text-gray-500" :href="repo.link">{{ repo.name }}</a>
    <span class="block text-xs">{{ repo.description }}</span>
    <div class="pt-4 text-lg">
      <span>lang: {{ repo.language }}</span>
      <span>stars: {{ repo.stars }}</span>
      <span>forks: {{ repo.forks }}</span>
    </div>
    <p class="hidden pb-5 text-gray-500">
      {{ repo }}
    </p>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    repo: {
      type: Object,
      default: () => ({
        name: 'Repository name',
        description: 'Repository description',
        language: 'Repository language',
        start: 'Repository starts count',
        forks: 'Repository forks count'
      })
    }
  }
}
</script>
