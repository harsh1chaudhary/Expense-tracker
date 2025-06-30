



async function showork() {
    try{
        const response=await fetch('/workdetails')
        const result=await response.json();
        console.log('result',result[0])
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
        },body:JSON.stringify({workname:worktittlevalue})})
        const result =await response.json();
        console.log("task",result)
    }catch (error){
        console.log('error',error)
    }
    showork();
    










}

window.onload=()=>{

    console.log('working')
    showork();
    const butt=document.getElementById('add')
    butt.addEventListener('click',addwork)
}