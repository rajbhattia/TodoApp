var unorder_item = document.getElementById('unorder')
firebase.database().ref('todoapp').on('child_added', function(snap){
    var data = snap.val()
    console.log(data.todo_item)
    var lst_item = document.createElement('li')
    var list_text = document.createTextNode(data.todo_item)
    lst_item.appendChild(list_text)
    // console.log(lst_item)
    unorder_item.appendChild(lst_item)


    var edit = document.createElement('button')
    // var edit_text = document.createTextNode('Edit')
    edit.setAttribute('onclick','edit(this)')
    edit.setAttribute('class','edit_btn fas fa-edit')
    edit2.setAttribute('id',data.key)

    var delete_2 = document.createElement('button')
    var delete_text_2 = document.createTextNode('Delete')
    delete_2.setAttribute('class','edit_btn')

    delete_2.setAttribute('onclick','delete_todo(this)')
    delete_2.setAttribute('id', data.key)
    // edit.appendChild(edit_text)
    delete_2.appendChild(delete_text_2)
    lst_item.appendChild(edit)
    lst_item.appendChild(delete_2)
    // val.value=''
   



    

})

function add_todo(){
    var val = document.getElementById('inp')
    console.log(val.value)
    // var lst_item = document.createElement('li')
    // var list_text = document.createTextNode(val.value)
    // lst_item.appendChild(list_text)
    // console.log(lst_item)
    // unorder_item.appendChild(lst_item)

    var key = firebase.database().ref().push().getKey()
    var obj ={
        todo_item : val.value,
        key : key
    }
    console.log(obj)

    firebase.database().ref('/Todo_Data').push(obj)
    var key = 12
    firebase.database().ref(`/user/${key}`).set(obj)
    firebase.database().ref(`/user_2/${key}`).push(obj)
    firebase.database().ref('/todoapp/'+key).set(obj)

    // Get Data
    firebase.database().ref('/todoapp').once('value',function(data){
        console.log(data.val())
    })

    var edit = document.createElement('button')
    var edit_text = document.createTextNode('Edit')
    edit.setAttribute('onclick','edit(this)')
    edit.setAttribute('class','edit_btn fas fa-edit')

    var delete_2 = document.createElement('button')
    var delete_text_2 = document.createTextNode('Delete')
    delete_2.setAttribute('class','edit_btn')
    delete_2.setAttribute('onclick','delete_todo(this)')
    edit.appendChild(edit_text)
    delete_2.appendChild(delete_text_2)
    lst_item.appendChild(edit)
    lst_item.appendChild(delete_2)
    val.value=''
    
    
}

function edit(e){
    var val = e.parentNode.childNodes[0].nodeValue
    var inp = prompt("Enter Value",val)
    e.parentNode.childNodes[0].nodeValue = inp
    firebase.database().ref('/todoapp/').child(e.id).set({
        todo_item = inp,
        key:e.id
    })
}

function delete_todo(e){
    
    e.parentNode.remove()
    // code for delete value from firebase DB
    firebase.database().ref('/todoapp/' + e.id).remove()
    e.parentNode.remove()
}

function delete_all_todo(){
    firebase.database().ref('/todoapp/').remove()

    unorder_item.innerHTML=''
}