<template>
  <div>
      <h1>List</h1>

<hr>

<table v-if="notes.length">
<thead>
    <tr>
<th>#</th>
<th>Title</th>
<th>Date</th>
<th>Note</th>
<th>Status</th>
<th>Open</th>
    </tr>
    </thead>

<tbody>
<tr 
v-for="(note, idx) of notes"
:key="note.id"
>
<td>{{idx + 1}}</td>
<td>{{note.title}}</td>
<td>{{ new Date(note.date).toLocaleDateString() }}</td>
<td class="td"><div class="text">{{note.description}}</div></td>
<td>{{note.status}}</td>
<td>
<router-link tag="button" class="btn btn-small" :to="'/note/' + note.id">
    Open
</router-link>
</td>
</tr>

</tbody>

</table>
<p v-else>You have no notes</p>
  </div>
</template>

<script>
export default {
    computed: {
        notes() {
            return this.$store.getters.notes
        }
    }
}
</script>

<style lang="scss" scoped>
.text {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.td {
    max-width: 400px;
}
</style>