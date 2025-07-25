from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pymongo import MongoClient
from bson.objectid import ObjectId
from bson.json_util import dumps
import requests
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response


class NoCacheMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        response: Response = await call_next(request)
        response.headers["Cache-Control"] = "no-store"
        return response
client=MongoClient("mongodb://localhost:27018/")
db=client["track"]
collection=db['tracktender']

print(client)

print("collectllll",collection.find())








app=FastAPI()
templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get('/')
def home(request:Request):
    return templates.TemplateResponse('index.html',{"request":request})

@app.post('/addwork')
async def add(request:Request):
    data= await request.json()
    print(data)
    xy=collection.find_one({"workname":data["workname"]})
    if xy:
        return {"status":"failed due to duplication"}
    result =collection.insert_one(data)

    return {"status": "ok", "inserted_id": str(result.inserted_id)}




@app.get('/additems')
def additem(request:Request):
    data=request.json() 

    return 'null'
@app.get('/workdetails')
def showork():


    return (list(collection.find({}, {"_id": False})))
@app.post('/createtable')
async def createtable(request:Request):
     data= await request.json()
     table_row = {
        "caption": data["caption"],
        "Expense Name": "-1",
        "Date": "12.12.12",
        "final price": "$$$$$"
    }
     filter_query={"workname":data["workname"]}
     collection.update_one(filter_query,{"$push":{"table":table_row}})

     return {"status":"created table"}

@app.post('/dlt')
async def dlt(request:Request):
     data= await request.json()
   
     query=data
     collection.delete_one(query)
     print(query)
     return {"status":"deleted"}

@app.post('/updatecell')     
async def updatecell(request:Request):
    data=await request.json()
    print(data)
    collection.update_one({"workname":data["workname"]},{"$set":{f'table.$[elem].{data["headername"]}':data["cell"]}},array_filters=[{"elem.caption":data["tablename"]}])
    return {"status":"update of cell "}