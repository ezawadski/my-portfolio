<template>
  <table>
    <thead>
      <tr>
        <th v-for="column in columns" :key="column">
          {{ column.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="entry in data" :key="entry">
        <td v-for="column in columns" :key="column">
          {{ entry[column.name] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppTable',
  props: {
    columns: Array,
    data: Array
  }
});
</script>

<style scoped></style>
