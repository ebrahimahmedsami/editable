<template>
    <div class="container">
        <el-table
            :data="users"
            style="width: 100%">

            <el-table-column
                label="Operations"
                min-width="180">
                <template slot-scope="{row, index}">
                    <el-button icon="el-icon-edit"
                               @click="setEditMode(row, index)">
                    </el-button>
                    <el-button type="success" icon="el-icon-check"
                               @click="saveRow(row, index)">
                    </el-button>
                </template>
            </el-table-column>

            <el-table-column
                label="Name"
                min-width="180">
                <editable-cell :show-input="row.editMode" slot-scope="{row}" v-model="row.name">
                    <span slot="content">{{row.name}}</span>
                </editable-cell>
            </el-table-column>

            <el-table-column
                label="Age"
                min-width="180">
                <editable-cell
                    editable-component="el-input-number"
                    :min="1"
                    :max="20"
                    :show-input="row.editMode"
                    slot-scope="{row}"
                    v-model="row.age">
                    <span slot="content">{{row.age}}</span>
                </editable-cell>
            </el-table-column>


            <el-table-column
                min-wwidth="150"
                label="Type">

                <editable-cell
                    :show-input="row.editMode"
                    slot-scope="{row}"
                    editable-component="el-select"
                    close-event="change"
                    v-model="row.type">

                    <el-tag size="medium"
                            :type="row.type"
                            slot="content">
                        {{row.type}}
                    </el-tag>

                    <template slot="edit-component-slot">
                        <el-option value="user" label="user"></el-option>
                        <el-option value="admin" label="admin"></el-option>
                        <el-option value="Vendor" label="Vendor"></el-option>
                    </template>

                </editable-cell>

            </el-table-column>

            <el-table-column
                label="Created At"
                min-width="250">
                <editable-cell
                    :show-input="row.editMode"
                    slot-scope="{row}"
                    editable-component="el-date-picker"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    v-model="row.created_at">
                    <span slot="content">{{row.created_at}}</span>
                </editable-cell>
            </el-table-column>

        </el-table>
    </div>
</template>

<script>
import EditableCell from "./cell.vue";

export default {
    name: "App",
    components: {
        EditableCell
    },
    data() {
        return {
            users:[]
        };
    },
    methods: {
        updateUser(id,updatedRow){
            axios.post('/api/update/user/'+id,updatedRow).then(response=>{
                console.log('updated')
            })
        },
        getUsers(){
            axios.get('/api/users').then(response=>{
                this.users = response.data.data.users
                this.host = response.data.data.host
                this.users = this.users.map(row => {
                    return {
                        ...row,
                        editMode: false
                    };
                });

            })
        },
        setEditMode(row, index) {
            row.editMode = true;
        },
        saveRow(row, index) {
            row.editMode = false;
            this.updateUser(row.id,row)
        }
    },
    created() {
        this.getUsers()
    }
};
</script>

<style>
.edit-cell {
    min-height: 35px;
    cursor: pointer;
}
</style>
