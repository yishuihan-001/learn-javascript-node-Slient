const APIError = require('../rest').APIError;

var gid = 0;

function nextId(){
    gid++;
    return 't' + gid;
}

var todos = [
    {
        id: nextId(),
        name: 'Learn CSS',
        description: 'Learn how to use CSS'
    },{
        id: nextId(),
        name: 'Learn JS',
        description: 'Learn how to use JS'
    },{
        id: nextId(),
        name: 'Learn HTML',
        description: 'Learn how to use HTML'
    }
];

var exportObj = {
    'GET /api/todos': async (ctx, next) => {
        ctx.rest({
            todos: todos
        });   
    },

    'POST /api/todos': async (ctx, next) => {
        var t = ctx.request.body,
            todo;
        if(!t.name || !t.name.trim()){
            throw new APIError('invalid_input', 'Missing name');
        }
        if(!t.description || !t.description.trim()){
            throw new APIError('invalid_input', 'Missing description');
        }
        todo = {
            id: nextId(),
            name: t.name.trim(),
            description: t.description.trim()
        };
        todos.push(todo);
        ctx.rest(todo);
    },

    'PUT /api/todos/:id': async (ctx, next) => {
        var t = ctx.request.body,
            index = -1,
            i,
            todo;
        if(!t.name || !t.name.trim()){
            throw new APIError('invalid_input', 'Missing name');
        }
        if(!t.description || !t.description.trim()){
            throw new APIError('invalid_input', 'Missing description');
        }
        for(i = 0; i < todos.length; i++){
            if(todos[i].id == ctx.params.id){
                index = i;
                break;
            }
        }
        if(index == -1){
            throw new APIError('notfound', 'Todo not found by id: ' + ctx.params.id);
        }
        todo = todos[index];
        todo.name = t.name.trim();
        todo.description = t.description.trim();
        ctx.rest(todo);
    },

    'DELETE /api/todos/:id': async (ctx, next) => {
        var i,
            index =-1;
        for(i = 0; i < todos.length; i++){
            if(todos[i].id == ctx.params.id){
                index = i;
                break;
            }
        }
        if(index == -1){
            throw new APIError('notfound', 'Todo not found by id: ' + ctx.params.id);
        }
        ctx.rest(todos.splice(index, 1)[0]);
    }
};

module.exports = exportObj;











