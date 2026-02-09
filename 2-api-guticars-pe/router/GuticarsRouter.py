from fastapi.routing import APIRouter
from fastapi_pagination import Page, paginate

from model.Guticar import Guticar

import pandas as pd


GuticarsRouter = APIRouter(
    prefix= "/guticars", 
    tags= ["Guticars"]
)

data = pd.read_csv("./data/guticars.pe.csv")

@GuticarsRouter.get("/")
async def get_guticars_root() -> Page[Guticar]:
    return paginate(data.to_dict(orient= "records"))
