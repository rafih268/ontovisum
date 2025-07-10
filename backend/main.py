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
  "object_properties": [],
  "data_properties": []
}

@app.post("/upload-ontology")
async def upload_ontology(file: UploadFile = File()):
  contents = await file.read()
  
  with tempfile.NamedTemporaryFile(delete=False, suffix=".owl") as tmp:
    tmp.write(contents)
    tmp_path = tmp.name
  
  onto = get_ontology(f"file://{tmp_path}").load()
  
  # classes = [cls.name for cls in onto.classes()]
  # instances = [inst.name for inst in onto.individuals()]
  # relations = [(prop.name, prop.domain, prop.range) for prop in onto.object_properties()]

  classes = []
  for cls in onto.classes():
    classes.append({
      "name": cls.name
    })
  
  object_props = []
  for prop in onto.object_properties():
    domains = [d.name for d in prop.domain]
    ranges = [r.name for r in prop.range]
    object_props.append({
      "name": prop.name,
      "domain": prop.domains,
      "range": prop.ranges
    })
  
  data_props = []
  for prop in onto.data_properties():
    domains = [d.name for d in prop.domain]
    ranges = [str(r) for r in prop.range]
    data_props.append({
      "name": prop.name,
      "domain": domains,
      "range": ranges,
    })

  ontology_data["classes"] = classes
  ontology_data["object_properties"] = object_props
  ontology_data["data_properties"] = data_props

  os.remove(tmp_path)
  return {"status": "uploaded"}

@app.get("/parsed-ontology")
def get_parsed_ontology():
  return ontology_data