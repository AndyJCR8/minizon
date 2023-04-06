from .. import models
from ..database import engine

models.Base.metadata.create_all(bind=engine)

def clearUpdateValuesFromDict(originalDict: dict):
    dict = originalDict.copy()
    for key in list(dict):
            if dict[key] is None: dict.pop(key)
    return dict