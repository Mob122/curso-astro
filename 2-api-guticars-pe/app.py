import subprocess
from router.GuticarsRouter import GuticarsRouter
from fastapi import FastAPI
from fastapi_pagination import add_pagination

app = FastAPI()

# Agregar paginación a la aplicación FastAPI.
add_pagination(app)

# Agregar el router de Guticars a la aplicación FastAPI.
app.include_router(GuticarsRouter)

@app.get("/")
async def get_root():
    return {'mensaje': 'Hola Mundo'}

if __name__ == "__main__":
    subprocess.run(["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000", "--reload"])