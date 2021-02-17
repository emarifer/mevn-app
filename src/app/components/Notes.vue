<template>
    <div class="container mt-5">
        <h1 class="text-center mb-5">Mis Notas</h1>

        <form @submit.prevent="executeAction(note)">
            <h4 class="text-center">{{ editingNote.text }} Nota</h4>
            <input type="text" class="form-control my-2" placeholder="Ingresa Nombre…" v-model="note.name" ref="autofocus">
            <input type="text" class="form-control my-2" placeholder="Ingresa Descripción…" v-model="note.description">
            <div class="text-center">
                <button type="submit" :class="editingNote.style" @keyup.enter="submit">
                    {{ editingNote.text }}
                </button>
                <button type="button" @click="cancel" v-if="editingNote.cancel" class="btn btn-secondary my-2">
                    Cancelar
                </button>
            </div>            
        </form>

        <div class="alert alert-danger alert-dismissible fade show" v-if="error" role="alert">
            <strong>¡Ocurrió un error!</strong> -- Error {{ error.status }}: {{ error.statusText }}<span v-if="message"> -- {{ message }}</span>.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

        <div class="alert alert-success alert-dismissible fade show" v-if="success" role="alert">
            <strong>{{ message }}</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

        <table class="table table-dark">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in notes" :key="index">
                    <th scope="row">{{ item._id }}</th>
                    <td>{{ item.name }}</td>
                    <td>{{ item.description }}</td>
                    <td>
                        <button @click="deleteNote(item._id)" class="btn btn-danger">
                            <span class="material-icons">
                                delete
                            </span>
                        </button>
                        <button @click="editNote(item)" class="btn btn-primary">
                            <span class="material-icons">
                                create
                            </span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                notes: [],
                note: { name: '', description: '' },
                success: false,
                error: null,
                message: null,
                editingNote: { text: 'Agregar',style: 'btn btn-success my-2 btn-block', id: '', cancel: false }
            }
        },
        mounted() {
            this.getAllNotes();
        },
        methods: {
            getAllNotes() {
                this.error = null;
                this.axios.get('/notes')
                    .then(res => {
                        // console.log(res.data);
                        this.notes = res.data;
                    })
                    .catch(e => {
                        // console.log(e.response);
                        this.error = e.response;
                        setTimeout(() => {
                            this.error = null;
                        }, 3000);
                    });
                    this.inputFocus();
            },
            executeAction(note) {
                this.editingNote.text === 'Agregar'
                    ? this.addNote(note)
                    : this.updateNote(note);
            },
            addNote(note) {
                // console.log(note);
                this.axios.post('/new-note', note)
                    .then(res => {
                        this.notes.push(res.data);
                        this.success = true;
                        this.message = '¡Nota agregada a la Base de Datos!';
                        setTimeout(() => {
                            this.success = false;
                            this.message = null;
                        }, 3000);
                    })
                    .catch(e => {
                        // console.log(e.response);
                        // Esta validacion se configuro en en Schema del backend
                        if (e.response.data.error) this.message = e.response.data.error.errors.name.message;
                        this.error = e.response;
                        setTimeout(() => {
                            this.error = null;
                            this.message = null;
                        }, 3000);
                    });
                    this.note.name = '';
                    this.note.description = '';
                    this.inputFocus();
            },
            deleteNote(id) {
                this.axios.delete(`/note/${id}`)
                    .then(res => {
                        const index = this.notes.findIndex( item => item._id === res.data._id);
                        this.notes.splice(index, 1);
                        this.success = true;
                        this.message = '¡Nota eliminada de la Base de Datos!';
                        setTimeout(() => {
                            this.success = false;
                            this.message = null;
                        }, 3000);
                    })
                    .catch(e => {
                        this.error = e.response;
                        setTimeout(() => {
                            this.error = null;
                        }, 3000);
                    });
                    this.editingNote = { // Por si se pulso primero el boton "Editar"
                        text: 'Agregar',
                        style: 'btn btn-success my-2 btn-block',
                        id: '',
                        cancel: false
                    };
                    this.note.name = '';
                    this.note.description = '';
                    this.inputFocus();
            },
            editNote(item) {
                this.editingNote = {
                    text: 'Editar',
                    style: 'btn btn-info my-2',
                    id: item._id,
                    cancel: true
                };
                this.note.name = item.name;
                this.note.description = item.description;
                this.inputFocus();
            },
            updateNote(note) {
                // console.log(note.name, note.description, this.editingNote.id);
                this.axios.put(`/note/${this.editingNote.id}`, note)
                    .then(res => {
                        const index = this.notes.findIndex(item => item._id === res.data._id);
                        this.notes[index].name = note.name;
                        this.notes[index].description = note.description;
                        this.success = true;
                        this.message = '¡Nota actualizada en la Base de Datos!';
                        setTimeout(() => {
                            this.success = false;
                            this.message = null;
                        }, 3000);
                        this.note.name = '';
                        this.note.description = '';
                    })
                    .catch(e => {
                        this.error = e.response;
                        setTimeout(() => {
                            this.error = null;
                        }, 3000);
                        this.note.name = '';
                        this.note.description = '';
                    });

                this.editingNote = {
                    text: 'Agregar',
                    style: 'btn btn-success my-2 btn-block',
                    id: '',
                    cancel: false
                };                
                this.inputFocus();
            },
            cancel() {
                this.editingNote = {
                    text: 'Agregar',
                    style: 'btn btn-success my-2 btn-block',
                    id: '',
                    cancel: false
                };
                this.note.name = '';
                this.note.description = '';
                this.inputFocus();
            },
            inputFocus() {
                this.$refs.autofocus.focus();
            }
        },
    }
</script>