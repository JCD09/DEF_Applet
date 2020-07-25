<template>
<div class="body">
    <Panel></Panel>
    <Table></Table>
</div>
</template>

<script>
import { mapState } from 'vuex'
import Panel from './table/Panel.vue'
import Table from './table/Table.vue'

export default {
    name: 'Body',
    components: {
        Panel,
        Table
    },

}
</script>

<style>
/* .body{
    border: 1px solid black
} */
.body {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 400px;
    padding: 5px;
}
</style>