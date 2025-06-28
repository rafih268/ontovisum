from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from owlready2 import *
import tempfile
import os

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"], # allowing requests from any origin (frontend server)
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

ontology_data = {
  "classes": [],
  "instances": [],
  "relations":[]
}

@app.post("/upload-ontology")
async def upload_ontology(file: UploadFile = File()):
  contents = await file.read()
  
  with tempfile.NamedTemporaryFile(delete=False, suffix=".owl") as tmp:
    tmp.write(contents)
    tmp_path = tmp.name
  
  onto = get_ontology(f"file://{tmp_path}").load()
  
  classes = [cls.name for cls in onto.classes()]
  instances = [inst.name for inst in onto.individuals()]
  relations = [(prop.name, prop.domain, prop.range) for prop in onto.object_properties()]

  ontology_data["classes"] = classes
  ontology_data["instances"] = instances
  ontology_data["relations"] = [(str(p), str(d), str(r)) for p, d, r in relations]

  os.remove(tmp_path)
  return {"status": "uploaded"}

@app.get("/parsed-ontology")
def get_parsed_ontology():
  return ontology_data