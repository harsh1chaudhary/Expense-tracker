

const collection_contain=document.getElementById('collection-container')
function edit(event){
    const button = event.currentTarget;
    const details = button.closest('details'); 
    const worname=details.querySelector('summary');
    const caption=details.querySelector('caption');
    console.log(worname.textContent ,caption.textContent);
    

}
function add_colom(e){
    console.log("inside the funtoon",e)
    const table= e.querySelector("table");
    const th=document.createElement('th');
    th.textContent="new data";
    th.contentEditable=true
    const thead=table.querySelector("thead");
    const tr=thead.querySelector("tr");
    tr.appendChild(th)





}

async function createtable(event){
    console.log('creating table')
    const button = event.currentTarget;
    const details = button.closest('details'); 
    const summary = details.querySelector('summary');

    const div=document.createElement("div");
    const tables = details.querySelectorAll('table');
    console.log(`Total tables: ${tables.length}`);
    div.innerHTML = `

    <table border="1">
        <caption contenteditable="true">${tables.length + 1}</caption>
        <button class="add_colo">ADD COloum</button>
        
        <thead>
            <tr>
                <th contenteditable="true">Expense Name</th>
                <th contenteditable="true">Date</th>
                <th contenteditable="true">Final Expense</th>
              
            </tr>
           
        </thead>
        <tbody>
            <tr>
                <td contenteditable="true"></td>
                <td contenteditable="true"></td>
                <td contenteditable="true">$1</td>
            </tr>
        </tbody>
    </table>
`;
    details.appendChild(div);
    try{
         const response=await fetch('/createtable' ,{method:'POST',        headers: {
            'Content-Type': 'application/json'
        },body:JSON.stringify({workname:summary.textContent,caption:`${tables.length + 1}`})});
        if (!response.ok){
            console.log("something wrong")
        }
        result=await response.json()
        console.log(result);

    }
    catch(erorr){
        console.log(error);

    }


}
function dltconfirm(){
    return new Promise((resolve)=>{
        console.log("confirming...");
        const div = document.createElement("div");
        div.className = "confirm-box";

        const message = document.createElement("p");
        message.innerText = "Are you sure you want to delete this item?";
        const yesbutton = document.createElement("button");
        const nobutton = document.createElement("button");

        yesbutton.innerText = "Yes";
        nobutton.innerText = "No";

        div.appendChild(message);
        div.appendChild(yesbutton);
        div.appendChild(nobutton);
        document.body.appendChild(div);
        yesbutton.addEventListener('click',()=>{
            document.body.removeChild(div);
            resolve(true);
        });
        nobutton.addEventListener('click',()=>{
            document.body.removeChild(div);
            resolve(false);
        }) ;

    });


}



async function deleted(event){
    console.log('type of = ',typeof dltconfirm);
    console.log("deleting.........");
    console.log("typeof dltconfirm =", typeof dltconfirm); // should be "function"
    
    
    
    const button = event.currentTarget;
    const details = button.closest('details'); // find the nearest parent <details>
    const paragraphElement = details.querySelector('summary');
    console.log(paragraphElement.textContent);
    try{
        const confirm =await dltconfirm();
        if (!confirm) return;
    
       const response=await fetch('/dlt' ,{method:'POST',        headers: {
            'Content-Type': 'application/json'
        },body:JSON.stringify({workname:paragraphElement.textContent})
       
    });
    const result = await response.json();
    console.log(result);
    if (response.ok){
        details.remove();
    }
    }


    catch(erorr){
        console.log("error",erorr)
    }
}
    





function showcasse(work){

    const workdiv=document.createElement('div');
    const details=document.createElement('details');
    const summary=document.createElement('summary');
    const savebutton=document.createElement('button');
    const dltbutton=document.createElement('button');
    const createtble=document.createElement('button');
    savebutton.innerText="Save";
    savebutton.style.display="none"
    savebutton.className="savebutton";
    savebutton.addEventListener('click',()=>{
        savebutton.style.display="none"
        console.log("save button pressed")

    })
    details.appendChild(savebutton)

    dltbutton.innerText='DLT'
    dltbutton.addEventListener('click',deleted);
    createtble.addEventListener('click',createtable);
    createtble.innerText="Create table"

    summary.textContent=work["workname"];
    details.appendChild(summary)
    details.appendChild(dltbutton);
    details.append(createtble);
    try{

    for (let i of work["table"]){
        console.log(i);
        const table=document.createElement('table');
        const caption=document.createElement('caption')
        const thead=document.createElement('thead');
        const tbody=document.createElement('tbody');
        const tr=document.createElement('tr');
        const tdr=document.createElement('tr');
        caption.innerText=i["caption"];
        table.appendChild(caption)
      
        for (let row in i){
            const th=document.createElement('th');
        
            console.log('row=',row);
            th.textContent=row;
            th.contentEditable=true;
            tr.append(th)
            
           
        }
        
        
      
       
      
        for (let row in i){
            console.log(i[row])
            const td=document.createElement('td');
            td.textContent=i[row];
            td.contentEditable=true;
            tdr.appendChild(td);
            


        }
        thead.append(tr)
        tbody.appendChild(tdr);
        table.contentEditable=true;
        table.appendChild(thead);
        table.appendChild(tbody);
       
        details.appendChild(table);
        
    }


    


  


    }
    catch(erorr){
        console.log("error",erorr)
    }




    workdiv.className='workdiv';
    workdiv.appendChild(details)
    collection_contain.appendChild(workdiv)


}


async function showork(worktittle=0) {
    try{
        const response=await fetch('/workdetails')
        const result=await response.json();
        console.log('result-->',(result));
        if (worktittle==0){
        for (let i in result){
            console.log(result[i])
            showcasse(result[i])
        }
    }
       else {
    const matched = result.find(item => item.workname === worktittle);
    if (matched) {
        showcasse(matched);
    } else {
        console.log('Work not found for title:', worktittle);
    }
}
            

        }
    catch (error){
        console.log('erorr',error);
    }

    
}



async function updatecell(workname,tableno,headername,cell) {
    console.log('updatingggg:',workname,tableno,headername,cell);
    try {
       const response=await fetch('/updatecell' ,{method:'POST', headers: {'Content-Type': 'application/json'},body:JSON.stringify({workname:workname,tablename:tableno,headername:headername,cell:cell})});
       if (response.ok){
        console.log("update of cell successfull")
       }
       if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

    } 

    catch (error) {
        console.log(error);
        
    }

    }



async function addwork(){
    const worktittle=document.getElementById('worktittle');
    const worktittlevalue=worktittle.value;
    if (worktittlevalue==''){
        console.log('emotyy box');
        return 404;

    }

    

    try{
        const response=await fetch('/addwork',
            {method:'POST',        headers: {
            'Content-Type': 'application/json'
        },body:JSON.stringify({workname:worktittlevalue,table:[]})})
        const result =await response.json();
        if (result["status"]=="ok"){

            showork(worktittlevalue);

        }
        else{
            alert("duplicate data cant we inserted")
        }
        console.log("task",result)
    }catch (error){
        console.log('error',error)
    }
    
    










}

window.onload=()=>{
   












    let activeeditable=null;
    let xactive=null;

    collection_contain.addEventListener("focusin",(e)=>{
        if (e.target.tagName=="TD"){
        activeeditable=e.target;
         let active_detail=activeeditable.closest("details");
            const savebut=active_detail.querySelector(".savebutton");
            savebut.style.display="block";
    };

    })
    collection_contain.addEventListener("focusout",(e)=>{
        if(activeeditable.tagName=="TD"){


        }
    })
    
    collection_contain.addEventListener('click',(e)=>{
        if(activeeditable!=null && activeeditable.tagName=='TD'){
            
            console.log("content edit---->",activeeditable.textContent)
            console.log("nearest",activeeditable.closest("details"));
            
            console.log("nearest table:",activeeditable.closest("table"));
            

     


            let active_detail=activeeditable.closest("details");

            let active_summary=active_detail.querySelector("summary");
            let active_table=activeeditable.closest("table");

            let active_caption=active_table.querySelector("caption");
            const row=activeeditable.parentElement;
            console.log("row:",row);
            const colindex=Array.from(row.children).indexOf(activeeditable);
            console.log("header is:-",colindex);
            const headerrow=active_table.querySelector("thead tr") ||active_table.row[0];
            const headerCell=headerrow?.children[colindex];
            const headtext=headerCell?.textContent?.trim();
            console.log("headtext:",headtext);

            


            
            updatecell(active_summary.textContent,active_caption.textContent,headtext,activeeditable.textContent);


         

        }
        if (activeeditable!=null &&activeeditable.textContent=="ADD COloum"){
            add_colom(activeeditable.closest("div"));
        }
        
        

        



        const clickeditem=e.target;

        activeeditable=clickeditem;
        
       
        console.log('target is:',clickeditem)
    })

  
    showork();
    const butt=document.getElementById('add')
    butt.addEventListener('click',addwork)
}