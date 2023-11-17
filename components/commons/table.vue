<template>
    <v-sheet class="w-100">
        <v-card-title class="text-uppercase text-caption ">
            {{ title }}
        </v-card-title>
        <v-card-text>
            <v-sheet border :style="{ width: tableWidth }">
                <v-table density="compact">
                    <thead>
                        <tr density="compact">
                            <th class="text-caption font-weight-bold" v-for="column in columns" :key="column">{{
                                column }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr density="compact" v-for="row in data" :key="row">
                            <td class="text-caption text-center " v-for="item in row" :key="item">{{ item }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-sheet>
        </v-card-text>
    </v-sheet>
</template>

<script>
export default {
    props: {
        title: String,
        columns: Array,
        data: Array,
        tableWidth: String,
    },
};
</script>
<style scoped>
th,
td {
    border: 1px solid #070707;
    padding: 0px;
    margin: 0;

}
</style>