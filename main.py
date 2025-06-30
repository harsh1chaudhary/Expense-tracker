from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pymongo import MongoClient
from bson.objectid import ObjectId
from bson.json_util import dumps
import requests
from fastapi.responses import JSONResponse



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

    result =collection.insert_one(data)

    return {"status": "ok", "inserted_id": str(result.inserted_id)}
@app.get('/additems')
def additem(request:Request):
    data=request.json() 

    return 'null'

@app.get('/workdetails')
def showork():
        return list(collection.find({}, {'_id': False}))