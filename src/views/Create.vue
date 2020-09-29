<template>
  <div class="row">
    <div class="col s6 offset-s3">
      <h1>Create note</h1>

      <form @submit.prevent="submitHandler">
                <div class="input-field">
          <input id="title" v-model="title" type="text" class="validate" required>
          <label for="title">Title</label>
          <span class="helper-text" data-error="Title is required"></span>
        </div>

        <div class="chips" ref="chips"></div>
         <div class="input-field">
            <textarea v-model="description" id="description" class="materialize-textarea"></textarea>
            <label for="description">Description</label>
            <span class="character-counter" style="float: right; font-size: 12px;">{{description.length}}/2000</span>
          </div>

          <input type="text" ref="datepicker">

          <button class="btn" type="submit">Create note</button>
        </form>
      </div>
  </div>
</template>

<script>
export default {
  name: 'create',
  data: () => ({
    description: '',
    title: '',
    chips: null,
    date: null,
  }),
  mounted() {
    this.chips = window.M.Chips.init(this.$refs.chips, {
      placeholder: 'Note tags'
    })
    this.date = window.M.Datepicker.init(this.$refs.datepicker, {
      format: 'dd.mm.yyyy',
      defaultDate: new Date (),
      setDefaultDate: true
    })
  },
  methods: {
    submitHandler() {
      const note = {
        title: this.title,
        description: this.description,
        id: Date.now(),
        status: 'active',
        tags: this.chips.chipsData,
        date: this.date.date
      }

      this.$store.dispatch('createNote', note)
      this.$router.push('/list')
    }
  },
  destroyed () {
    if (this.date && this.date.destroy) {
      this.date.destroy()
    }

      if (this.chips && this.chips.destroy) {
      this.chips.destroy()
    }

  }
}
</script>
