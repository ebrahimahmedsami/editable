<template>
    <div>
        <div class="d-flex mb-2 mt-2">
            <div class="m-auto text-center" style="width: 200px;">
                <div class="form-check">
                    <input class="form-check-input" @change="(mode='cell')" name="mode" type="radio" id="cell" checked>
                    <label class="form-check-label" for="cell">
                        Cell Editing
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" @change="(mode='row')" name="mode" id="row">
                    <label class="form-check-label" for="row">
                        Row Editing
                    </label>
                </div>
            </div>

            <div class="m-auto text-center" style="width: 200px;">
                <div class="form-check">
                    <input class="form-check-input" @change="(clicked='click')" name="clicked" type="radio" id="click">
                    <label class="form-check-label" for="click">
                        One Click
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" @change="(clicked='dblclick')" name="clicked" id="dbclick" checked>
                    <label class="form-check-label" for="dbclick">
                        Double Click
                    </label>
                </div>
            </div>
        </div>
        <b-editable-table
            bordered
            class="editable-table"
            v-model="users"
            :fields="fields"
            :editMode="mode"
            :editTrigger="clicked"
            @input-change="handleInput"
        >
            <template #cell(status)="data">
                <span v-if="data.value">Active</span>
                <span v-else>In-Active</span>
            </template>
        </b-editable-table>
        <pre>
    </pre>
    </div>
</template>

<script>
import BEditableTable from "bootstrap-vue-editable-table";

export default {
    components: {
        BEditableTable,
    },
    data() {
        return {
            users:[],
            host:'',
            mode:'cell',
            clicked:'dblclick',
            fields: [
                {
                    key: "name",
                    label: "Name",
                    type: "text",
                    editable: true,
                    placeholder: "Enter Name...",
                    class: "name-col",
                    validate: this.validateName
                },
                {
                    key: "age",
                    label: "Age",
                    type: "number",
                    editable: true,
                    placeholder: "Enter Age...",
                    class: "age-col",
                    validate: this.validateName
                },
                {
                    key: "type",
                    label: "Type",
                    type: "select",
                    editable: true,
                    class: "type-col",
                    options: [
                        { value: 'user', text: "User" },
                        { value: 'admin', text: "Admin" },
                        { value: 'vendor', text: "Vendor" },
                    ],
                },
                {
                    key: "created_at",
                    label: "Created At",
                    type: "date",
                    editable: true,
                    class: "date-col",
                    locale: "en",
                    "date-format-options": {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                    },
                },
                {
                    key: "status",
                    label: "Status",
                    type: "checkbox",
                    editable: true,
                    class: "is-active-col",
                },
            ],
        };
    },
    created() {
        this.getUsers()
    },
    methods: {
        handleInput(data) {
            console.log(data)

            const updatedRow = {...this.users[data.index], [data.field.key]: data.value};
            if (data.validity.valid){
                this.updateUser(updatedRow.id,updatedRow);
                this.$set(this.users, data.index, updatedRow);
            }

        },
        getUsers(){
            axios.get('/api/users').then(response=>{
                this.users = response.data.data.users
                this.host = response.data.data.host
            })
        },
        updateUser(id,updatedRow){
            axios.post('/api/update/user/'+id,updatedRow).then(response=>{
                console.log('updated')
            })
        },
        validateName(value) {
            if (value === '') {
                return {
                    valid: false,
                    errorMessage: 'Please enter name'
                }
            }
            return {
                valid: true
            };
        }
    },
};
</script>

<style>
table.editable-table {
    margin: auto;
}

table.editable-table td {
    vertical-align: middle;
}

.editable-table .data-cell {
    padding: 8px;
    vertical-align: middle;
}

.editable-table .custom-checkbox {
    width: 50px;
}

.name-col {
    width: 120px;
}

.department-col {
    width: 150px;
}

.age-col {
    width: 100px;
}

.date-col {
    width: 200px;
}

.is-active-col {
    width: 100px;
}
</style>
