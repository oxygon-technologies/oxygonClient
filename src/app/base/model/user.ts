export class User {
 name:String = "";
 password:String = "";
 email:string = "";
 authdata:string = "";

 logicalUnit = {columns : [{columnName : 'name',
                            required : true,
                            editable : false,
                            dataType : 'text'
                            }, 
                            {columnName : 'email',
                            required : true,
                            editable : true,
                            dataType : 'text'
                            },
                            {columnName : 'status',
                            required : true,
                            editable : false,
                            dataType : 'selector',
                            selectorValue : ['ACTIVE','DEACTIVE'],
                            displayType : 'chip',
                            displayTypeColor : 'primary'
                            }]
                        };

}