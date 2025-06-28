from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from owlready2 import *
import tempfile
import os

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

ontology_data = {
  "classes": [],
  "instances": [],
  "relationships":[]
}