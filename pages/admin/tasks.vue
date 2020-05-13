<template>
  <div class="container">
    <div class="columns">
      <div class="column is-6 is-12-mobile">
        <div class="box">
          <form class="admin-form" @submit="createTask">
            <div class="field">
              <label class="label">Text</label>
              <input type="text" class="input" v-model="newTask.text" />
            </div>
            <div class="field">
              <div class="control">
                <button class="button is-link">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="column is-6 is-12-mobile">
        <div class="box">
          <table class="table is-fullwidth">
            <thead>
              <tr>
                <th>Text</th>
                <th>Complete</th>
              </tr>
            </thead>
            <tbody>
              <tr :key="task._id" v-for="task in tasks">
                <td>{{ task.text }}</td>
                <td>
                  <input type="checkbox" @click="updateTask(task._id)" v-model="task.complete" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tasks',
  layout: 'admin',
  middleware: 'verified',
  data() {
    return {
      newTask: {
        text: '',
        complete: false,
      }
    }
  },
  async asyncData(ctx) {
    const { tasks } = await ctx.$axios.$get('/api/tasks')

    return {
      tasks
    }
  },
  methods: {
    async createTask() {
      const { text, complete } = this.newTask
      const { created } = await this.$axios.$post(`/api/tasks`, { text, complete })
      this.tasks = this.tasks.concat(created)
    },
    async updateTask(id) {
      const { updated } = await this.$axios.$put(`/api/tasks/${id}`, { complete: true })
    }
  }
}
</script>