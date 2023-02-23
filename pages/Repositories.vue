<template>
  <div class="p-10 grid grid-cols-3 gap-4">
    <RepositoryItem v-for="(repo, index) in repos" :key="index" :repo="repo" />
  </div>
</template>

<script lang="ts">
import RepositoryItem from '@/components/RepositoryItem.vue'

export default {
  components: { RepositoryItem },
  data () {
    return {
      repos: []
    }
  },
  async fetch () {
    const res = await fetch('https://api.github.com/users/simonppg/repos')
      .then(res => res?.json())

    this.repos = res.map((r: any) => {
      return {
        name: r?.full_name,
        link: r?.html_url,
        description: r?.description,
        language: r?.language,
        forks: r?.forks_count,
        stars: r?.stargazers_count
      }
    })
  }
}
</script>
