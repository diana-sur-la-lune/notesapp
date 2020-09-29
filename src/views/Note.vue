<template>
  <div class="row">
      <div v-if="note" class="col s6 offset-s3">
      <h1>{{note.title}}</h1>

 <form @submit.prevent="submitHandler">
               

        <div class="chips" ref="chips"></div>
         <div class="input-field">
            <textarea style="min-height: 150 px" v-model="description" id="description" class="materialize-textarea"></textarea>
            <label for="description">Description</label>
            <span class="character-counter" style="float: right; font-size: 12px;">{{description.length}}/2000</span>
          </div>

          <input type="text" ref="datepicker">
     
          <button class="btn" type="submit" style="margin-right: 1rem;">Save</button>
          <button class="btn blue" type="button" @click="completeNote">Completed</button>
       
        </form>

      </div>
  <p v-else>Note not found</p>
    </div>
</template>

<script>
export default {
    computed: {
        note() {
            return this.$store.getters.noteById(+this.$route.params.id)
        }
    },
     data: () => ({
    description: '',
    chips: null,
    date: null,
  }),
  mounted() {
      this.description = this.note.description,
    this.chips = window.M.Chips.init(this.$refs.chips, {
      placeholder: 'Note tags',
      data: this.note.tags
    })
    this.date = window.M.Datepicker.init(this.$refs.datepicker, {
      format: 'dd.mm.yyyy',
      defaultDate: new Date (this.note.date),
      setDefaultDate: true
    })
    setTimeout(() => {
        window.M.updateTextFields()
    }, 0)
  },
  methods: {
    submitHandler() {
  
      this.$store.dispatch('updateNote', {
          id: this.note.id,
          description: this.description,
          date: this.date.date
      })
      this.$router.push('/list')
    },
    completeNote() {
        this.$store.dispatch('completeNote', this.note.id)
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

<style lang="scss" scoped>

</style>