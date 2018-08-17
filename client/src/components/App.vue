<template>
  <div>
    <nav-bar></nav-bar>
      <div class="container">
      <message-alert :message="alertMessage"></message-alert>
      <div class="card mt-5 mb-5">
        <h5 class="card-header">Add Note</h5>
        <div class="card-body">
          <div class="form-group">
            <input v-model="note.title" class="form-control" placeholder="Note Title Here..."/>
          </div>
          <div class="form-group">
            <textarea v-model="note.body" class="form-control" rows="3" placeholder="Note Body Here..."></textarea>
          </div>
          <div>
              <div style="float:left">
                <button title="Add Note" @click="addNote" class="btn btn-link">
                  <icon name="plus"></icon>
                </button>
              </div>
          </div>
        </div>
      </div>

      <div v-if="notes.length" class="card mb-3">
        <div class="card-header bg-primary">
          <h4>Note List</h4>
        </div>
      </div>
      <div v-if="notes.length" class="row mb-5">
        <div class="col-sm-4" v-for="note in notes" :key="note.id">
          <div class="card mb-3">
            <div class="card-body" @click="editNote(note)" title="Click Note to Edit">
                <h4 class="card-title">{{note.title}}</h4>
                <p class="card-text">{{note.body}}</p>
            </div>
            <div class="card-footer text-muted">
                <div style="float:left"><timeago :datetime="note.updated_at" :auto-update="60"></timeago></div>
                <div style="float:right">
                    <button title="Delete Note" @click="deleteNote(note)" class="btn btn-link"><icon name="trash"></icon></button> 
                </div>
            </div>
        </div>
          <!-- <note-item :note="note" v-on:editNoteItem="editNote"></note-item> -->
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import axios from 'axios';
 import API from '../constants';
export default {
  name: 'AppMain',
  data () {
    return {
      notes : [],
      note : {
        _id : null,
        title : null,
        body : null,
        author_id : null,
      },
      alertMessage:null,
      edit:false,
      noteApiUrl : API.notesUrl,
      config : { headers : {
        "x-access-token": this.$session.get('token')
        }
      }
    }
  },
  beforeCreate: function () {
    if (!this.$session.has('token')) {
      this.$router.push('/login')
    }
  },
  created()  {
    this.getNotes();
  },
  methods:{
    getNotes : function(){
      axios.get(this.noteApiUrl,this.config)
      .then(res=>{
        this.notes = res.data.payload
      }).catch(err=>{
        console.log(err)
      });
     this.discardNote(); 
    },
    addNote : function(){
      if(!this.edit){
        axios.post(this.noteApiUrl+'/create',this.note,this.config)
        .then(res=>{
          this.getNotes();
          const alert = {status:res.data.status,message:res.data.message}
          this.alertMessage = alert;
        })
        .catch(err=>{
          console.log(err)
        })
      }else{
        // update the post
         axios.put(this.noteApiUrl+'/update/'+this.note._id,this.note,this.config)
        .then(res=>{
          this.getNotes();
          const alert = {status:res.data.status,message:res.data.message}
          this.alertMessage = alert;
        })
        .catch(err=>{
          console.log(err)
        })
      }

    },
    deleteNote : function(note){
      if(confirm("Are You Sure?")){
        axios.delete(this.noteApiUrl+'/remove/'+note._id,this.config)
        .then(res=>{
          this.getNotes();
          const alert = {status:res.data.status,message:res.data.message}
          this.alertMessage = alert;
        })
        .catch(err=>{
          console.log(err);
        })
      }
    },
    discardNote : function(){
      this.note.id = null
      this.note.body = null,
      this.note.title = null,
      this.edit = false
    },
    editNote : function(note){
      this.edit = true;
      this.note = note;
    }
  }
}
</script>
