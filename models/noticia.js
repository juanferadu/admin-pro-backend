const {Schema,model} = require('mongoose');

const noticiaSchema = Schema({

    nombre:{
        type: String,
        required:true
    },
    descripcion:{
        type: String,
        required:true        
    }    
});

noticiaSchema.method('toJSON', function(){
   const{ __v,_id, ...object} = this.toObject();
   object.uid = _id;
   return object;
})

module.exports =  model('noticia', noticiaSchema);