
const collection_contain=document.getElementById('collection-container')






function createtable(){
    
}










function showcasse(work){
    const workdiv=document.createElement('div');
    const details=document.createElement('details');
    const summary=document.createElement('summary');
    summary.textContent=work["workname"];
    details.appendChild(summary)
    try{

    for (let i of work["table"]){
        console.log(i);
        const table=document.createElement('table');
        const thead=document.createElement('thead');
        const tbody=document.createElement('tbody');
        const tr=document.createElement('tr');
        const tdr=document.createElement('tr');
      
        for (let row in i){
            const th=document.createElement('th');
            console.log('row=',row);
            th.textContent=row;
            tr.append(th)
            
           
        }
        
        
      
       
      
        for (let row in i){
            console.log(i[row])
            const td=document.createElement('td');
            td.textContent=i[row];
            tdr.appendChild(td);
            


        }
        thead.append(tr)
        tbody.appendChild(tdr);
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
        console.log('result',(result));
        if (worktittle==0){
        for (let i in result){
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
        console.log("task",result)
    }catch (error){
        console.log('error',error)
    }
    showork(worktittlevalue);
    










}

window.onload=()=>{

    console.log('working')
    showork();
    const butt=document.getElementById('add')
    butt.addEventListener('click',addwork)
}